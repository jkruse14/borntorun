class CourseSegment < ApplicationRecord
    belongs_to :course

    validates :gps_data, presence :true
    validates :order_num, presence :true, numbericality: {greater_than_or_equal_to: 0}

end
