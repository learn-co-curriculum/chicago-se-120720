class AnimalSerializer < ActiveModel::Serializer
  attributes :id, :name, :gender, :species

  def species
    @object.species.name
  end

end
