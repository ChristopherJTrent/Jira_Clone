class CreateMemberships < ActiveRecord::Migration[7.1]
  def change
    create_table :memberships do |t|
      t.references :user, foreign_key: true
      t.references :project, foreign_key: true
      t.timestamps
    end
    add_index :memberships, [:user_id, :project_id], unique: true
  end
end
