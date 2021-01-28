class CreateInspos < ActiveRecord::Migration[6.1]
  def change
    create_table :inspos do |t|
      t.string :title
      t.string :code_snippet
      t.string :img_url

      t.timestamps
    end
  end
end
