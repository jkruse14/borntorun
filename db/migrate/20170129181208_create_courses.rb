class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.integer :host_id
      t.integer :event_id
      t.text :gps_data
      t.string :gps_file

      t.timestamps
    end
  end
end
