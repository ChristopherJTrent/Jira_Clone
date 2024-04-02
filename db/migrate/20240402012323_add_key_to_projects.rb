class AddKeyToProjects < ActiveRecord::Migration[7.1]
  def change
    change_table :projects do |t|
      t.string :key, null: false
    end
  end
end
