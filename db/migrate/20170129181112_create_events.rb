class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.integer :host_id
      t.integer :course_id
      t.float :distance
      t.string :city
      t.string :state
      t.string :country
      t.float :entry_fee
      t.text :description

      t.timestamps
    end
  end
end
