class MOVIE 
  API_KEY = "41ecc174e82b6b1f94905705134b107a"

  def self.fetch_movies_playing_now
    api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=#{API_KEY}&language=en-US&page=1"

    response = RestClient.get(api_url)
    parsed_response = JSON.parse(response.body)
    # api call
  end
  
  def self.most_popular(keyword)
    api_url = "https://api.themoviedb.org/3/search/keyword?api_key=#{API_KEY}&query=#{keyword}&page=1"
    response = RestClient.get(api_url)
    parsed_response = JSON.parse(response.body)
  end

end