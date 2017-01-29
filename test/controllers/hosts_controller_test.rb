require 'test_helper'

class HostsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get hosts_new_url
    assert_response :success
  end

end
