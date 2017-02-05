class CreateCourseSegments < ActiveRecord::Migration[5.0]
  def change
    create_table :course_segments do |t|
      t.integer :course_id
      t.integer :event_id
      t.integer :order_num
      t.text :gps_data

      t.timestamps
    end
  end
end
