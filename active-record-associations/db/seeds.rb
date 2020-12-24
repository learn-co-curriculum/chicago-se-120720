require "faker"

Book.destroy_all
Author.destroy_all
AuthorBook.destroy_all

10.times do
  Book.create(title: Faker::Book.title, description: Faker::Lorem.sentence)
  Author.create(name: Faker::Book.author)
end

book_ids = Book.all.map{ |book| book.id }
author_ids = Author.all.map{ |author| author.id }

30.times do
  author_id = author_ids.sample
  book_id = book_ids.sample

  existing = AuthorBook.find_by(author_id: author_id, book_id: book_id)

  AuthorBook.create(author_id: author_id, book_id: book_id) unless existing
end

puts "seeds created!"