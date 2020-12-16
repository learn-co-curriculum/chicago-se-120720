require "pry"

require_relative "bank_account.rb"
require_relative "transfer.rb"

max_account = BankAccount.new("max")
danielle_account = BankAccount.new("danielle")

tr_one = Transfer.new(max_account, danielle_account, 100)
tr_one.execute_transaction
binding.pry