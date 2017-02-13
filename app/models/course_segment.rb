class CourseSegment < ApplicationRecord
    belongs_to :course
    #serialize :gps_data

    validates :gps_data, presence: true
    validates :order_num, presence: true, numericality: {greater_than_or_equal_to: 0}

end
