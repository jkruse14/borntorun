class CoursesController < ApplicationController
    
    def as_json(options = {})
        super(options.merge(include: :course_segment))
    end
    
    def course_params
        params.require(:course).permit(:host_id, :event_id, :gps_data)
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
        course = Course.create(course_params)
        event = Event.find_by(id: course_params[:event_id])
        event.update(course_id: course.id)
        
        respond_with course 
    end

    def update
    end

    def destroy
    end

end
