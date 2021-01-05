class CLI
  def run
   sign_in
   home
  end

  def sign_in
    clear_screen
    puts "Welcom to Movie Rater!"
    divider

    puts "Enter a new or existing USERNAME"
    username = get_user_input
    @current_user = User.find_or_create_by(username: username)
  end

  def home 
    clear_screen
    puts "Hi #{@current_user.username}, you have #{@current_user.movies.count} rated movies"
    divider

    puts "Select from the choices below:"
    puts "1) My Movies"
    puts "2) Playing"
    puts "3) Search"
    puts "\n~~ (Q)uit or (R)estart ~~"
    
    choice = get_user_input.upcase

    case choice
    when "1"
      my_movies
    when "2"
      playing_now
    when "3"
      search
    when "R" || "RESTART"
      run
    when "Q" || "QUIT"
    else
      incorrect_selection
    end
  end

  def clear_screen
    system "clear"
  end

  def divider
    puts "*" * 30
    puts "\n"
    pause
  end

  def pause
    sleep 1
  end

  def incorrect_selection
    clear_screen
    puts "Oops try again..."
    pause
    home
  end

  def my_movies
    clear_screen
    puts "my movies, WIP"
    get_user_input
    home
  end

  def playing_now
    clear_screen
    movies = MovieAPI.playing_now
    puts_from_api(movies)
    # puts "playing now, WIP"
    get_user_input
    home
  end

  def search
    clear_screen
    puts "add a seach term"
    query = get_user_input
    movies = MovieAPI.search(query)

    puts_from_api(movies)
    get_user_input
    home
  end

  def get_user_input
    gets.chomp
  end

  def puts_from_api(movies)
    movies.each_with_index do |movie, i|
      puts "#{i + 1}) #{movie['title']}"
    end
  end
end