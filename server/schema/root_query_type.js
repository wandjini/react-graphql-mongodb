const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = graphql;
const axios = require('axios');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const UserType = require('./user_type');
const WebsiteType = require('./website_type');
const WebcontentType = require('./webcontent_type');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');
const constants = require('../services/constants');

const {
  USER_ACCOUNT_BASE_URL,
  USER_ID,
  USER_NAME,
  PASSWORD,
  WEBSITE_BASE_URL,
  STRUCTURED_CONTENTS_BASE_URL
} = constants;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: SongType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parentValue, {
        id
      }) {
        return Song.findById(id);
      }
    },
    lyric: {
      type: LyricType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(parnetValue, {
        id
      }) {
        return Lyric.findById(id);
      }
    },
    user: {
      type: UserType,
      resolve() {
        return axios.get(`${USER_ACCOUNT_BASE_URL}${USER_ID}`, {
            auth: {
              username: USER_NAME,
              password: PASSWORD
            }
          })
          .then(res => {
            //console.log(res)
            return res.data
          })
          .catch(error => console.log(error))
      }
    },
    website: {
      type: WebsiteType,
      resolve() {
        return axios.get(`${WEBSITE_BASE_URL}`, {
            auth: {
              username: USER_NAME,
              password: PASSWORD
            }
          })
          .then(res => {
            //console.log(res)
            return res.data
          })
          .catch(error => console.log(error))
      }
    },
    webcontent: {
      type: WebcontentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, {
        id
      }) {
        return axios.get(`${STRUCTURED_CONTENTS_BASE_URL}${id}`, {
            auth: {
              username: USER_NAME,
              password: PASSWORD
            }
          })
          .then(res => {
            console.log(res);
            return res.data})
          .catch(error => console.log(error))
      }
    }
  })
});

module.exports = RootQuery;