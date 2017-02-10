class Event < ApplicationRecord
    belongs_to :host
    has_many :course

    validates :distance, numericality: {greater_than: 0}
    validates :city, presence: true
    validates :state, presence: true
    validates :country, presence: true
    validates :entry_fee, presence: true, numericality: {greater_than_or_equal_to: 0}
    validates :description, presence: true, length: { maximum: 500 }
    validates :eventType, presence: true, inclusion: { in: %w(road track xc trail mixed other) }
    validates :title, presence: true, length: {minimum: 10, maximum:140}
end
