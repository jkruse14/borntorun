class Course < ApplicationRecord
    belongs_to :event, dependent: :destroy
    has_many :course_segments

    #validates :gps_data, presence :true
    #validates :gps_file, presence :true, if :gps_data_in_file?

    # def gps_data_in_file?
    #     :gps_data == 'file'
    # end
end
