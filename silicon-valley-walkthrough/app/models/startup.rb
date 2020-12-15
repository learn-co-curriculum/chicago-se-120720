class Startup

  attr_accessor :name
  attr_reader :founder, :domain

  @@all = []

  def initialize(name, founder, domain)
    @name = name
    @founder = founder
    @domain = domain

    @@all << self
  end

  #given a string of a domain and a string of a name, change the domain and name of the startup. This is the only public method through which the domain should be changed.
  def pivot(domain, name)
    @domain = domain
    self.name = name
  end

  #Returns a unique array of all the venture capitalists that have invested in this company
  def investors
    funding_rounds.map {|funding_round_instance| funding_round_instance.venture_capitalist}.uniq
  end

  #given a venture capitalist object, type of investment (as a string), and the amount invested (as a float), creates a new funding round and associates it with that startup and venture capitalist.
  def sign_contract(vc_instance, investment_type, amt_invested)
    FundingRound.new(self, vc_instance, investment_type, amt_invested)
  end

  def funding_rounds
    FundingRound.all.select { |funding_round_instance| funding_round_instance.startup == self }
  end

  #Returns the total number of funding rounds that the startup has gotten
  def num_funding_rounds
    funding_rounds.count
  end

  #should return all of the startup instances
  def self.all
    @@all
  end

  #given a string of a founder's name, returns the first startup whose founder's name matches
  def self.find_by_founder(founder_name)
    self.all.find {|startup_instance| startup_instance.founder == founder_name }
  end

  #should return an array of all of the different startup domains
  def self.domains
    self.all.map { |startup_instance| startup_instance.domain }.uniq
  end

end
