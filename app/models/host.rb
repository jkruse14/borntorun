class Host < ApplicationRecord
    has_many :events

    validates :name, presence: true, length: {maximum: 50}

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates :email, presence: true, length: {maximum: 255},
                format: { with: VALID_EMAIL_REGEX }

    validates :motto length: { maximum: 140 }
    validates :contact_name, presence: true, length: {maximum: 50}
end
