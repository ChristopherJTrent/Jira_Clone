class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :description
      t.references :owner, null: false, foreign_key: {
        to_table: :users
      }
      t.timestamps
    end
    add_index :projects, [:owner_id, :title], unique: true
  end
end
