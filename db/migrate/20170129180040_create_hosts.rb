class CreateHosts < ActiveRecord::Migration[5.0]
  def change
    create_table :hosts do |t|
      t.string :name
      t.string :email
      t.string :motto
      t.string :city
      t.string :state
      t.string :country
      t.string :contact_name

      t.timestamps
    end
  end
end
