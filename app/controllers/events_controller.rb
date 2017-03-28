class EventsController < ApplicationController

    def as_json(options = {})
        super(options.merge(include: :host))
    end

    def event_params
        params.permit(:host_id, :course_id, :distance, :eventType, :city, :state, :country, :entry_fee, :description, :title);
    end
    
    def index
        respond_with Event.all
    end

    def show
        @event = Event.find(params[:id])
        @course = Course.find(@event.course_id)
        @segments = CourseSegment.find_by({course_id: @course.id})
        @response = {:event => @event, :course => @course, :segments => @segments}
        respond_with @response
    end

    def new
    end

    def edit
    end

    def create
        respond_with Event.create(event_params)
    end

    def update
        respond_with Event.update(event_params)
    end

    def destroy
        respond_with Event.destroy(params[:id])
    end
end
