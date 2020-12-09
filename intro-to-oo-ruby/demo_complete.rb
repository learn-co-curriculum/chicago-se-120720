require "pry"

class BankAccount
  attr_accessor :user_name, :balance
  attr_reader :account_num

  @@all = []

  def initialize(user_name, balance, account_num)
    @user_name = user_name
    @balance = balance
    @account_num = account_num
    
    @@all << self

    puts "new account created for #{@user_name}"
  end

  def do_a_thing
    puts "inside instance method"
    puts self
  end

  puts "on the class"
  puts self

  def self.all_accounts
    @@all
  end

  # # username getter
  # def user_name
  #   @user_name
  # end
  
  # # balance getter
  # def balance
  #   @balance
  # end

  # #user_name setter
  # def user_name=(new_user_name)
  #   @user_name = new_user_name
  # end

  # #balance setter
  # def balance=(new_balance)
  #   @balance = new_balance
  # end
end



new_account1 = BankAccount.new("Julie", 100, 111)
new_account2 = BankAccount.new("Jake", 100, 112)
new_account3 = BankAccount.new("Jordan", 100, 113)

binding.pry