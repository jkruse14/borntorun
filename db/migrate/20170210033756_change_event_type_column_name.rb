class ChangeEventTypeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :events, :type, :eventType
  end
end
