class SetNotNullOnMembershipsForeigns < ActiveRecord::Migration[7.1]
  def change
    change_column_null :memberships, :user_id, false
    change_column_null :memberships, :project_id, false
  end
end
