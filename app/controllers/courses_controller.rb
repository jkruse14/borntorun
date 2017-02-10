class CoursesController < ApplicationController
    def course_params
        params.require(:course).permit(:host_id, :event_id, :gps_data, :gps_file)
    end

    def index
        respond_with Course.all
    end

    def show
        respond_with Course.find(params[:id])
    end

    def new
    end

    def edit
    end

    def create
        respond_with Course.create(course_params)
    end

    def update
    end

    def destroy
    end

end
