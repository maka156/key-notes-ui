<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar flat color="grey lighten-2">

          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="teal accent-4" dark class="mb-2">Add a Note</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.title" label="Note Title"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.description" label="Note Description"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="teal accent-4" flat @click="close">Cancel</v-btn>
                <v-btn color="teal accent-4" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-data-table
          :items="desserts"
          class="elevation-1"
          hide-actions
          hide-headers
        >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.description }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="teal lighten-1" @click="initialize">Reset</v-btn>
        </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  import Api from '../Api.js'

  export default {
    data: () => ({
      dialog: false,
      desserts: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        description: ''
      },
      defaultItem: {
        title: '',
        description: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        Api().get()
        .then(response => {
          this.desserts = response.data
        })
        .catch(e => {
          this.$swal('Unable to process your request, please try again')
          this.errors.push(e)
        })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        this.deleted = Object.assign({}, item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)

        Api().delete('/notes/' + this.deleted._id)
          .then(response => {      
          })
          .catch(e => {
            this.$swal('We could not delete the note, please try again')
            this.errors.push(e)
          })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Api().put('/notes/' + this.editedItem._id, {title: this.editedItem.title, description: this.editedItem.description})
          .then(response => {            
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          })
          .catch(e => {
            this.$swal('Something went wrong, please try again')
            this.errors.push(e)
          })

        } else {
          Api().post('/notes', {title: this.editedItem.title, description: this.editedItem.description})
          .then(response => {            
            this.desserts.push(this.editedItem)
          })
          .catch(e => {
            this.$swal('Something went wrong, please try again')
            this.errors.push(e)
          })
        }
        this.close()
      }
    }
  }
</script>
