class CreateBartenders < ActiveRecord::Migration[6.1]
  def change
    create_table :bartenders do |t|
      t.string :username

      t.timestamps
    end
  end
end
