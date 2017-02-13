class EventsController < ApplicationController
    def event_params
        params.require(:event).permit(:host_id, :course_id, :distance, :eventType, :city, :state, :country, :entry_fee, :description, :title);
    end
    
    def index
        respond_with Event.all
    end

    def show
        respond_with Event.find(params[:id])
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
