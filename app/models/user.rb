# frozen_string_literal: true

# User model
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :email, presence: true, uniqueness: true # , email: true
  validate :password_validator

  has_many :projects,
           inverse_of: 'owner',
           dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email:)
    return unless user&.authenticate(password)

    user
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  private

  def password_validator
    return if password.nil?
    # this allows for a "correctHorseBatteryStaple" password to be valid
    return if password.length > 16 && /.*[A-Z]/ =~ password

    return if calculate_password_score > 5

    errors.add :password, :insufficient_security, message: 'password score must be greater than 5'
  end

  def calculate_password_score
    password_score = 0
    password_score += validate_password_length
    password_score += validate_password_digit
    password_score += validate_password_lowercase
    password_score += validate_password_uppercase
    password_score + validate_password_special
  end

  def validate_password_length
    if password.length < 8
      errors.add :password, :too_short,
                 message: 'password must be more than 8 characters'
      0
    else
      (password.length - 4) / 4
    end
  end

  def validate_password_digit
    return 1 if /.*\d/ =~ password

    0
  end

  def validate_password_lowercase
    return 1 if /.*[a-z]/ =~ password

    0
  end

  def validate_password_uppercase
    return 1 if /.*[A-Z]/ =~ password

    0
  end

  def validate_password_special
    return 1 if /.*[!@$#%^&*,.;:|]/ =~ password

    0
  end

  def generate_unique_session_token
    loop do
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end
end
