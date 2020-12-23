class Book < ActiveRecord::Base

  # @@all = []

  # def initialize(title, description)
  #   @title = title
  #   @description = description

  #   @@all << self
  # end

  # def save 
  #   sql = <<-SQL
  #     INSERT INTO books (title, description)
  #     VALUES (?, ?);
  #   SQL

  #   DB[:conn].execute(sql, self.title, self.description)
  # end

  # def self.all
  #   sql = <<-SQL
  #     SELECT * FROM books;
  #   SQL

  #   DB[:conn].execute(sql)
  # end

end