

describe Hero do
  subject(:hero) {
    Hero.new([
      {
          name: "Super Strength",
          coolness: 3
      },
      {
          name:"Flight",
          coolness: 5
      },
      {
          name: "Lightning Blast",
          coolness: 10
      }
    ])
  }

  describe "#coolest_ability" do
    let(:coolest_ability) {
      {
        name: "Lightning Blast",
        coolness: 10
      }
    }

    it "should return the hero's coolest ability" do
      expect(hero.coolest_ability).to eq(coolest_ability)
    end
  end

  describe "#ability_names" do 
    it "should return an array of ability names" do
      expect(hero.ability_names).to include("Flight", "Lightning Blast", "Super Strength")
    end
  end

  describe "#ordered_abilities" do 
    let(:ordered_abilities) { ["Flight", "Lightning Blast", "Super Strength"] }

    it "should return an array of ability names ordered alphabetically" do 
      expect(hero.ordered_abilities).to eq(ordered_abilities)
    end
  end

  describe "#add_ability" do
    context "if the new ability is a hash" do
      let(:new_ability) {
        {
          name: "Hammer Call",
          coolness: 9 
        }
      }
      
      it "should add the ability to the hero's abilities" do
        hero.add_ability(new_ability)
        
        expect(hero.abilities).to include(new_ability)
      end
    end

    context "if the new ability is not a hash" do 
      let(:new_ability) { "Hammer Call" }
       
      it "should not add the ability to the hero's abilities" do
        hero.add_ability(new_ability)

        expect(hero.abilities).to_not include(new_ability)
      end

      it "should print an error to the user" do
        expect(STDOUT).to receive(:puts).with("Not a hash!")
        hero.add_ability(new_ability)
      end
    end
  end
end