class BankAccount 
  attr_accessor :name, :status
  attr_reader :balance

  @@all = []

  def initialize(name)
    @name = name
    @balance = 1000
    @status = "open"

    @@all << self
  end

  def deposit(amount)
    @balance += amount
  end

  def withdraw(amount)
    @balance -= amount
  end

  def valid?
    status == "open" && balance > 0
  end

  def funds?(amount)
    balance >= amount
  end

  def self.all
    @@all
  end

  def sent_transfers
    Transfer.all.select do |transfer| 
      tranfer.sender == self
    end
  end
end