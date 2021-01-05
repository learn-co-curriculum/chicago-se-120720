class CLI
  def run
    sign_in
    home
  end
  
  def sign_in
    clear_terminal
    puts "Hello, welcome to Movie Rater!"
    divider
    puts "Enter a new or existing USERNAME"
    username = get_user_input
    @user = User.find_or_create_by(username: username)
  end

  def home
    clear_terminal
    puts "<3 Hi #{@user.username}, you have #{@user.movies.count} rated movies! <3"
    divider

    puts "Select from the items below:"
    puts "1) My Movies"
    puts "2) Playing now"
    puts "3) Search"
    puts "\n ~~ (Q)uit or (R)estart ~~" 

    choice = get_user_input.upcase
    
    case choice
    when "1"
    when "2"
      playing_now
    when "3"
      search
    when "4"
      sign_in
    when "Q" || "QUIT"
    when "R" || "RESTART"
      run
    else
      puts "Oops try again..."
      pause
      home
    end
  end

  def playing_now
    clear_terminal
    puts "Movies Playing Now"
    divider

    @movies = MovieAPI.playing_now
    puts_from_api(@movies)
  end

  def search
    clear_terminal
    puts "Search"
    divider

    puts "Enter a movie title to continue"
    query = get_user_input

    @movies = MovieAPI.search(query)
    puts_from_api(@movies)
  end

  def puts_from_api(movies)
    movies.each_with_index do |movie, i|
      puts "#{i + 1}) #{movie['title']}"
    end
  end

  def get_user_input
    gets.chomp
  end

  def clear_terminal
    system "clear"
  end

  def pause
    sleep 1
  end

  def divider
    puts "*" * 30
    puts "\n"
    pause
  end
end