class Tweet
  attr_accessor :message, :username
  # @@all = []

  def self.all
    sql = <<-SQL
      SELECT * FROM tweets
    SQL

    DB[:conn].execute(sql)
  end

  def initialize(attrs={})
    @message = attrs['message']
    @username = attrs['username']

    # @@all << self
  end

  def save
    sql = <<-SQL
      INSERT INTO tweets (username, message) 
      VALUES (?, ?)
    SQL

    DB[:conn].execute(sql, self.username, self.message)
  end

  def update(new_message)
    sql = <<-SQL
      UPDATE tweets SET message = ? WHERE id = ?
    SQL

    DB[:conn].execute(sql, new_message, self.id)
  end

  def self.create_table
    sql = <<-SQL
      CREATE TABLE IF NOT EXISTS tweets (
        id INTEGER PRIMARY KEY,
        username TEXT,
        message TEXT
      )
    SQL

    DB[:conn].execute(sql)
  end
end
  