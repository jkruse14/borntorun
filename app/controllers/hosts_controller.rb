class HostsController < ApplicationController
    def host_params
        params.require(:host).permit(:name, :email, :motto, :city, :state, :country, :contact_name)
    end

    def index
        respond_with Host.all
    end

    def show
        respond_with Host.find(params[:id])
    end

    def new
    end

    def edit
    end

    def create
        respond_with Host.create(host_params)
    end

    def update
    end

    def destroy
    end
end
