# frozen_string_literal: true

# User model
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :email, presence: true, uniqueness: true # , email: true
  validate :password_validator

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

    validate_password_length
    validate_password_digit
    validate_password_lowercase
    validate_password_uppercase
    validate_password_special
  end

  def validate_password_length
    return if password.length > 8

    errors.add :password, :too_short,
               message: 'password must be more than 8 characters'
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
    return if /.*[!@$#%^&*,.;:|]/ =~ password

    errors.add :password, :requires_special_char,
               message: 'password must include at least one special character (!@$#%^&*,.;:|)'
  end

  def generate_unique_session_token
    loop do
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end
end
