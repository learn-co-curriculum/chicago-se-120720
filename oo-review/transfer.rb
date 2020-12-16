class Transfer
  attr_reader :amount, :sender
  attr_accessor :status

  @@all = []

  def initialize(sender, receiver, amount)
    @sender = sender
    @receiver = receiver
    @amount = amount
    @status = "pending"

    @@all << self
  end

  def execute_transaction 
    if valid?
      @sender.withdraw(amount)
      @receiver.deposit(amount)

      self.status = "complete"
    else  
      self.status = "rejected"
      "Transaction rejected: Not enough funds"
    end
  end

  def valid?
    @sender.valid? && @receiver.valid? && @sender.funds?(amount)
  end

  def self.all
    @@all
  end
end