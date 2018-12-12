import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  updateFilters = newFilters => {
    this.setState({ filters: { type: newFilters } });
    // Below does the same as above but using callback
    // this.setState(state => {
    //   state.filters.type = newFilters
    //   return state
    // })
  };

  fetchPets = () => {
    let type = this.state.filters.type;
    let url = "/api/pets";
    if (type !== "all") {
      url += `?type=${type}`;
    }
    fetch(url)
      .then(resp => resp.json())
      .then(pets => {
        this.setState({ pets: pets });
      });
  };

  adoptPet = (petId) => {
    this.setState(state => {
      let pet = state.pets.find( pet => {return pet.id === petId})
      pet.isAdopted = true
      return state
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.updateFilters}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
