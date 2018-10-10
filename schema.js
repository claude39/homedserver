const graphql = require('graphql')
const { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLID } = graphql
const Illness = require('./models/illness')
const Remedy = require('./models/remedy')
const IllnessRemedy = require('./models/remedytype')
const IllnessWithRemedies = require('./models/illnesswithremedies')
const RemedyWithIllnesses = require('./models/remedywithillnesses')

const IllnessType = new GraphQLObjectType({
    name: 'Illness',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        causes: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

const RemedyType = new GraphQLObjectType({
    name: 'Remedy',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        remedytype: {
            type: IllnessRemedyType,
            resolve(parent, args) {
                return IllnessRemedy.findById(parent.remedytypeid)
            }
        }
    })
})

const IllnessWithRemediesType = new GraphQLObjectType({
    name: 'IllnessWithRemedies',
    fields: () => ({
        id: { type: GraphQLID },
        illnessid: { type: GraphQLID },
        remediesid: { type: GraphQLList(GraphQLID) },
        illness: {
            type: IllnessType,
            resolve(parent, args) {
                return Illness.findById(parent.illnessid)
            }
        },
        remedies: {
            type: GraphQLList(RemedyType),
            async resolve(parent, args) {
                let remedies = []
                console.log(parent.remediesid)
                await parent.remediesid.forEach((id) => {
                    remedies.push(Remedy.findById(id))
                })
                console.log(remedies)
            }
        }
    })
})

const RemedyWithIllnessesType = new GraphQLObjectType({
    name: 'RemedyWithIllnesses',
    fields: () => ({
        id: { type: GraphQLID },
        remedyid: { type: GraphQLID },
        illnessesid: { type: GraphQLList(GraphQLID) },
        remedy: {
            type: RemedyType,
            resolve(parent, args) {
                return Illness.findById(parent.illnessid)
            }
        },
        illnesses: {
            type: GraphQLList(IllnessType),
            async resolve(parent, args) {
                let illnesses = []
                await parent.remediesid.forEach((id) => {
                    illnesses.push(Illness.findById(id))
                })
            }
        }
    })
})

const IllnessRemedyType = new GraphQLObjectType({
    name: 'RemedyType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
})

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allRemedies: {
            type: GraphQLList(RemedyType),
            resolve(parent, args) {
                return Remedy.find()
            }
        },
        allIllnessWithRemedies: {
            type: GraphQLList(IllnessWithRemediesType),
            resolve(parent, args) {
                return IllnessWithRemedies.find()
            }
        },
        allIllness: {
            type: GraphQLList(IllnessType),
            resolve(parent, args) {
                return Illness.find()
            }
        },
        allRemedyWithIllnesses: {
            type: GraphQLList(RemedyWithIllnessesType),
            resolve(parent, args){
                return RemedyWithIllnesses.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRemedyType: {
            type: IllnessRemedyType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return new IllnessRemedy({ name: args.name }).save()
            }
        },
        addRemedy: {
            type: RemedyType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                remedytypeid: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return new Remedy({ name: args.name, remedytypeid: args.remedytypeid }).save()
            }
        },
        addIllnessWithRemedies: {
            type: IllnessWithRemediesType,
            args: {
                illnessid: { type: GraphQLNonNull(GraphQLID) },
                remediesid: { type: GraphQLList(GraphQLNonNull(GraphQLID)) },
            },
            resolve(parent, args) {
                return new IllnessWithRemedies({ illnessid: args.illnessid, remediesid: args.remediesid }).save()
            }
        },
        addIllness: {
            type: IllnessType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                causes: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return new Illness({ name: args.name, description: args.description, causes: args.causes }).save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})