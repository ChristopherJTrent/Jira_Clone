class User < ApplicationRecord
 	has_secure_password
	before_validation :ensure_session_token


	validates :email, presence: true, uniqueness: true, email: true
	validate :password_validator

	def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		if user&.authenticate(password)
			user
		else
			nil
		end
	end

	def passwordValidator()
		# this allows for a "correctHorseBatteryStaple" password to be valid
		return if password.length > 16 && /.*[A-Z]/ =~ password
		unless password.length > 8
			errors.add :password, :too_short, message: "password must be more than 8 characters"
		end
		unless /.*\d/ =~ password
			errors.add :password, :reqiures_number, message: 'password must contain a number'
		end
		unless /.*[a-z]/ =~ password
			errors.add :password, :requires_lowercase, message: 'your password must include at least one lowercase letter'
		end
		unless /.*[A-Z]/ =~ password
			errors.add :password, :requires_uppercase, message: 'your password must include at least one capital letter'
		end
		unless /.*[!@$#%^&*,.;:|]/ =~ password
			errors.add :password, :requires_special_char, message: 'your password must include at least one special character (!@$#%^&*,.;:|)'
		end
	end
end
