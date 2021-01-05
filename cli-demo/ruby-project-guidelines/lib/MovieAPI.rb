class MovieAPI
  API_KEY = "41ecc174e82b6b1f94905705134b107a"

  def self.playing_now
    api_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=#{API_KEY}&language=en-US&page=1"

    response = RestClient.get(api_url)
    parsed_response = JSON.parse(response.body)

    parsed_response["results"]
  end
  
  def self.search(query)
    api_url = "https://api.themoviedb.org/3/search/movie?api_key=#{API_KEY}&query=#{query}&page=1"
    response = RestClient.get(api_url)
    parsed_response = JSON.parse(response.body)

    parsed_response["results"]
  end
end