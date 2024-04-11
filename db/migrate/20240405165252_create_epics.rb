class CreateEpics < ActiveRecord::Migration[7.1]
  def change
    create_table :epics do |t|
      t.string :title, null: false
      t.string :description
      t.references :project, foreign_key: true
      t.timestamps
    end
    add_index :epics, [:project_id, :title], unique: true
  end
end
