class Author < ActiveRecord::Base
  has_many :author_books
  has_many :books, through: :author_books

  def self.show_book_titles
    Book.all.map do |book|
      binding.pry
    end
  end
end