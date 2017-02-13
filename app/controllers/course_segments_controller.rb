class CourseSegmentsController < ApplicationController
    def segment_params
        params.require(:course_segment).permit(:course_id, :gps_data, :order_num)
    end
    
    def index
        respond_with CourseSegment.all.count
    end

    def create
        params.delete(:gps_data)
        respond_with CourseSegment.create(segment_params)
    end

    def destroy
        respond_with CourseSegment.destroy(params[:id])
    end

end