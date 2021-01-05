# API_KEY = "41ecc174e82b6b1f94905705134b107a"

# api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=#{API_KEY}&language=en-US&page=1"

# response = RestClient.get(api_url)
# parsed_response = JSON.parse(response.body)

# parsed_response["results"].each do |result|
#   movie = Movie.create(title: result["original_title"], description: result["overview"])
#   if Director.find_by(name: result["movie_director"])
#     movie.director = 
#   end
# end