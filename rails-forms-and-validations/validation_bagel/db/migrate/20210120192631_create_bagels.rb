class CreateBagels < ActiveRecord::Migration[6.1]
  def change
    create_table :bagels do |t|
      t.string :name, null: false
      t.float :price, null: false
      t.boolean :special, default: false

      t.timestamps
    end
  end
end
