const Client = require("../models/Client");
const Project = require("../models/Project");
const ProjectActivityComment = require("../models/ProjectActivityComment");
const ClientActivityComment = require("../models/ClientActivityComment");
const Invoice = require("../models/Invoice");
const Transaction = require("../models/Transaction");
const Service = require("../models/Service");
const ClientActivityCommentReply = require("../models/ClientActivityCommentReply");
const ProjectActivityCommentReply = require("../models/ProjectActivityCommentReply");
const Ticket = require("../models/Ticket");
const Member = require("../models/Member");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLEnumType,
  GraphQLBoolean,
} = require("graphql");

// Member Type
const MemberType = new GraphQLObjectType({
  name: "Member",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    emailAddress: { type: GraphQLString },
    companyName: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    notes: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    createdAt: { type: GraphQLString },
    startDate: { type: GraphQLString },
    deadline: { type: GraphQLString },
    clientBudget: { type: GraphQLString },
    projectEstimate: { type: GraphQLString },
  }),
});

// Service Type
const ServiceType = new GraphQLObjectType({
  name: "Service",
  fields: () => ({
    id: { type: GraphQLID },
    service: { type: GraphQLString },
    cost: { type: GraphQLString },
    notes: { type: GraphQLString },
    paymentSchedule: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
    serviceProvider: { type: GraphQLString },
    status: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    member: {
      type: MemberType,
      resolve(parent, args) {
        return Member.findById(parent.memberId);
      },
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    emailAddress: { type: GraphQLString },
    companyName: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// Invoice Type
const InvoiceType = new GraphQLObjectType({
  name: "Invoice",
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLString },
    invoiceNumber: { type: GraphQLString },
    date: { type: GraphQLString },
    notes: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
    createdAt: { type: GraphQLString },
  }),
});

// Transaction Type
const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    paymentParty: { type: GraphQLString },
    amount: { type: GraphQLString },
    paymentDate: { type: GraphQLString },
    incomingOutgoing: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
    createdAt: { type: GraphQLString },
  }),
});

// ProjectActivityComment Type
const ProjectActivityCommentType = new GraphQLObjectType({
  name: "ProjectActivityComment",
  fields: () => ({
    id: { type: GraphQLID },
    commentText: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
  }),
});

// ClientActivityComment Type
const ClientActivityCommentType = new GraphQLObjectType({
  name: "ClientActivityComment",
  fields: () => ({
    id: { type: GraphQLID },
    commentText: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// ClientActivityCommentReply Type
const ClientActivityCommentReplyType = new GraphQLObjectType({
  name: "ClientActivityCommentReply",
  fields: () => ({
    id: { type: GraphQLID },
    commentText: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    clientActivityComment: {
      type: ClientActivityCommentType,
      resolve(parent, args) {
        return ClientActivityComment.findById(parent.commentId);
      },
    },
  }),
});

// ProjectActivityCommentReply Type
const ProjectActivityCommentReplyType = new GraphQLObjectType({
  name: "ProjectActivityCommentReply",
  fields: () => ({
    id: { type: GraphQLID },
    commentText: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    projectActivityComment: {
      type: ProjectActivityCommentType,
      resolve(parent, args) {
        return ProjectActivityComment.findById(parent.commentId);
      },
    },
  }),
});

// Ticket type
const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    typeOfTicket: { type: GraphQLString },
    description: { type: GraphQLString },
    blocked: { type: GraphQLBoolean },
    blockedReason: { type: GraphQLString },
    status: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    member: {
      type: MemberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Member.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    clientsByStatus: {
      type: new GraphQLList(ClientType),
      args: { status: { type: GraphQLString } },
      resolve(parent, args) {
        return Client.find({ status: args.status });
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    clientProjects: {
      type: new GraphQLList(ProjectType),
      args: { clientId: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.find({ clientId: args.clientId });
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    services: {
      type: new GraphQLList(ServiceType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return Service.find({ projectId: args.projectId });
      },
    },
    service: {
      type: ServiceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Service.findById(args.id);
      },
    },
    clientInvoices: {
      type: new GraphQLList(InvoiceType),
      args: { clientId: { type: GraphQLID } },
      resolve(parent, args) {
        return Invoice.find({
          clientId: args.clientId,
        });
      },
    },
    projectInvoices: {
      type: new GraphQLList(InvoiceType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return Invoice.find({
          projectId: args.projectId,
        });
      },
    },
    invoice: {
      type: InvoiceType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Invoice.findById(args.id);
      },
    },
    clientTransactions: {
      type: new GraphQLList(TransactionType),
      args: { clientId: { type: GraphQLID } },
      resolve(parent, args) {
        return Transaction.find({ clientId: args.clientId });
      },
    },
    projectTransactions: {
      type: new GraphQLList(TransactionType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return Transaction.find({ projectId: args.projectId });
      },
    },
    transaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Transaction.findById(args.id);
      },
    },
    projectActivityComments: {
      type: new GraphQLList(ProjectActivityCommentType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectActivityComment.find({ projectId: args.projectId });
      },
    },
    projectActivityComment: {
      type: ProjectActivityCommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectActivityComment.findById(args.id);
      },
    },
    clientActivityComments: {
      type: new GraphQLList(ClientActivityCommentType),
      args: { clientId: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientActivityComment.find({ clientId: args.clientId });
      },
    },
    clientActivityComment: {
      type: ClientActivityCommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientActivityComment.findById(args.id);
      },
    },
    clientActivityCommentReplies: {
      type: new GraphQLList(ClientActivityCommentReplyType),
      args: { commentId: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientActivityCommentReply.find({
          commentId: args.commentId,
        });
      },
    },
    clientActivityCommentReply: {
      type: ClientActivityCommentReplyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ClientActivityCommentReply.findById(args.id);
      },
    },
    projectActivityCommentReplies: {
      type: new GraphQLList(ProjectActivityCommentReplyType),
      args: { commentId: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectActivityCommentReply.find({
          commentId: args.commentId,
        });
      },
    },
    projectActivityCommentReply: {
      type: ProjectActivityCommentReplyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ProjectActivityCommentReply.findById(args.id);
      },
    },
    tickets: {
      type: new GraphQLList(TicketType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.find({ projectId: args.projectId });
      },
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a Member
    addMember: {
      type: MemberType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        emailAddress: { type: new GraphQLNonNull(GraphQLString) },
        companyName: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const member = new Member({
          username: args.username,
          emailAddress: args.emailAddress,
          companyName: args.companyName,
          password: args.password,
        });

        return member.save();
      },
    },
    // Delete a Member
    deleteMember: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Client.find({ memberId: args.id }).then((clients) => {
          clients.forEach((client) => {
            client.remove();
          });
        });

        return Member.findByIdAndRemove(args.id);
      },
    },
    // Update a Member
    updateMember: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Member.findByIdAndUpdate(
          args.id,
          {
            $set: {
              username: args.username,
              emailAddress: args.emailAddress,
              companyName: args.companyName,
              password: args.password,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Client
    addClient: {
      type: ClientType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClientStatus",
            values: {
              lead: { value: "Lead" },
              prospect: { value: "Prospect" },
              current: { value: "Current" },
              former: { value: "Former" },
              cold: { value: "Cold" },
            },
          }),
          defaultValue: "Prospect",
        },
      },
      resolve(parent, args) {
        const client = new Client({
          firstName: args.firstName,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
          emailAddress: args.emailAddress,
          companyName: args.companyName,
          status: args.status,
        });

        return client.save();
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },

    // Edit a Client Name
    updateClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClientStatusUpdate",
            values: {
              lead: { value: "Lead" },
              prospect: { value: "Prospect" },
              current: { value: "Current" },
              former: { value: "Former" },
              cold: { value: "Cold" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              phoneNumber: args.phoneNumber,
              emailAddress: args.emailAddress,
              companyName: args.companyName,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Project
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              notStarted: { value: "notStarted" },
              inProgress: { value: "inProgress" },
              completed: { value: "completed" },
              paused: { value: "paused" },
              needsAttention: { value: "needsAttention" },
            },
          }),
          defaultValue: "notStarted",
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        clientBudget: { type: GraphQLString },
        projectEstimate: { type: GraphQLString },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          description: args.description,
          status: args.status,
          notes: args.notes,
          clientId: args.clientId,
          startDate: args.startDate,
          deadline: args.deadline,
          clientBudget: args.clientBudget,
          projectEstimate: args.projectEstimate,
        });

        return project.save();
      },
    },

    // Delete an Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        ProjectActivityComment.find({ projectId: args.id }).then(
          (projectActivityComments) => {
            projectActivityComments.forEach((projectActivityComment) => {
              projectActivityComment.remove();
            });
          }
        );
        Service.find({ projectId: args.id }).then((services) => {
          services.forEach((service) => {
            service.remove();
          });
        });
        Transaction.find({ projectId: args.id }).then((transactions) => {
          transactions.forEach((transaction) => {
            transaction.remove();
          });
        });
        Invoice.find({ projectId: args.id }).then((invoices) => {
          invoices.forEach((invoice) => {
            invoice.remove();
          });
        });
        return Project.findByIdAndRemove(args.id);
      },
    },

    // Update a Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        notes: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              notStarted: { value: "notStarted" },
              inProgress: { value: "inProgress" },
              completed: { value: "completed" },
              paused: { value: "paused" },
              needsAttention: { value: "needsAttention" },
            },
          }),
        },
        startDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        clientBudget: { type: GraphQLString },
        projectEstimate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              status: args.status,
              notes: args.notes,
              clientId: args.clientId,
              startDate: args.startDate,
              deadline: args.deadline,
              clientBudget: args.clientBudget,
              projectEstimate: args.projectEstimate,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Service
    addService: {
      type: ServiceType,
      args: {
        service: { type: new GraphQLNonNull(GraphQLString) },
        cost: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        paymentSchedule: {
          type: new GraphQLEnumType({
            name: "ServicePaymentSchedule",
            values: {
              weekly: { value: "Weekly" },
              monthly: { value: "Monthly" },
              yearly: { value: "Yearly" },
              perInstance: { value: "Per Instance" },
            },
          }),
          defaultValue: "Monthly",
        },
        serviceProvider: {
          type: new GraphQLEnumType({
            name: "ServiceProvider",
            values: {
              inHouse: { value: "In House" },
              thirdParty: { value: "Third Party" },
            },
          }),
          defaultValue: "In House",
        },
        status: {
          type: new GraphQLEnumType({
            name: "ServiceStatus",
            values: {
              off: { value: "off" },
              on: { value: "on" },
              paused: { value: "paused" },
            },
          }),
          defaultValue: "off",
        },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        const service = new Service({
          service: args.service,
          cost: args.cost,
          notes: args.notes,
          paymentSchedule: args.paymentSchedule,
          serviceProvider: args.serviceProvider,
          status: args.status,
          notes: args.notes,
          projectId: args.projectId,
          startDate: args.startDate,
          endDate: args.endDate,
        });

        return service.save();
      },
    },

    // Delete a Service
    deleteService: {
      type: ServiceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Service.findByIdAndRemove(args.id);
      },
    },

    // Update a Service
    updateService: {
      type: ServiceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        service: { type: new GraphQLNonNull(GraphQLString) },
        cost: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        serviceProvider: {
          type: new GraphQLEnumType({
            name: "ServiceProviderUpdate",
            values: {
              inHouse: { value: "In House" },
              thirdParty: { value: "Third Party" },
            },
          }),
          defaultValue: "In House",
        },
        paymentSchedule: {
          type: new GraphQLEnumType({
            name: "ServicePaymentScheduleUpdate",
            values: {
              weekly: { value: "Weekly" },
              monthly: { value: "Monthly" },
              yearly: { value: "Yearly" },
              perInstance: { value: "Per Instance" },
            },
          }),
          defaultValue: "Monthly",
        },
        status: {
          type: new GraphQLEnumType({
            name: "ServiceStatusUpdate",
            values: {
              off: { value: "off" },
              on: { value: "on" },
              paused: { value: "paused" },
            },
          }),
          defaultValue: "off",
        },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Service.findByIdAndUpdate(
          args.id,
          {
            $set: {
              service: args.service,
              cost: args.cost,
              notes: args.notes,
              serviceProvider: args.serviceProvider,
              paymentSchedule: args.paymentSchedule,
              status: args.status,
              notes: args.notes,
              projectId: args.projectId,
              startDate: args.startDate,
              endDate: args.endDate,
            },
          },
          { new: true }
        );
      },
    },

    // Add an Invoice
    addInvoice: {
      type: InvoiceType,
      args: {
        date: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        invoiceNumber: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const invoice = new Invoice({
          date: args.date,
          amount: args.amount,
          notes: args.notes,
          invoiceNumber: args.invoiceNumber,
          clientId: args.clientId,
          projectId: args.projectId,
        });

        return invoice.save();
      },
    },

    // Delete an Invoice
    deleteInvoice: {
      type: InvoiceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Invoice.findByIdAndRemove(args.id);
      },
    },

    // Update an Invoice
    updateInvoice: {
      type: InvoiceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: GraphQLString },
        amount: { type: GraphQLString },
        notes: { type: GraphQLString },
        invoiceNumber: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Invoice.findByIdAndUpdate(
          args.id,
          {
            $set: {
              date: args.date,
              amount: args.amount,
              notes: args.notes,
              invoiceNumber: args.invoiceNumber,
              clientId: args.clientId,
              projectId: args.projectId,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Transaction
    addTransaction: {
      type: TransactionType,
      args: {
        paymentDate: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLString) },
        paymentParty: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        incomingOutgoing: {
          type: new GraphQLEnumType({
            name: "IncomingOutgoing",
            values: {
              incoming: { value: "Incoming" },
              outgoing: { value: "Outgoing" },
            },
          }),
          defaultValue: "Outgoing",
        },
      },
      resolve(parent, args) {
        const transaction = new Transaction({
          paymentDate: args.paymentDate,
          amount: args.amount,
          paymentParty: args.paymentParty,
          clientId: args.clientId,
          projectId: args.projectId,
          incomingOutgoing: args.incomingOutgoing,
        });

        return transaction.save();
      },
    },

    // Delete a Transaction
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Transaction.findByIdAndRemove(args.id);
      },
    },

    // Update a Transaction
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        paymentDate: { type: GraphQLString },
        amount: { type: GraphQLString },
        paymentParty: { type: GraphQLString },
        incomingOutgoing: {
          type: new GraphQLEnumType({
            name: "IncomingOutgoingUpdate",
            values: {
              incoming: { value: "Incoming" },
              outgoing: { value: "Outgoing" },
            },
          }),
          defaultValue: "Outgoing",
        },
      },
      resolve(parent, args) {
        return Transaction.findByIdAndUpdate(
          args.id,
          {
            $set: {
              paymentDate: args.paymentDate,
              amount: args.amount,
              paymentParty: args.paymentParty,
              clientId: args.clientId,
              projectId: args.projectId,
              incomingOutgoing: args.incomingOutgoing,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Project Activity Comment
    addProjectActivityComment: {
      type: ProjectActivityCommentType,
      args: {
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const projectActivityComment = new ProjectActivityComment({
          commentText: args.commentText,
          createdAt: args.createdAt,
          projectId: args.projectId,
        });

        return projectActivityComment.save();
      },
    },

    // Delete a Project activity comment
    deleteProjectActivityComment: {
      type: ProjectActivityCommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        ProjectActivityCommentReply.find({ commentId: args.id }).then(
          (projectActivityCommentReplies) => {
            projectActivityCommentReplies.forEach(
              (projectActivityCommentReply) => {
                projectActivityCommentReply.remove();
              }
            );
          }
        );
        return ProjectActivityComment.findByIdAndRemove(args.id);
      },
    },

    // Update a Project activity comment
    updateProjectActivityComment: {
      type: ProjectActivityCommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ProjectActivityComment.findByIdAndUpdate(
          args.id,
          {
            $set: {
              id: args.id,
              commentText: args.commentText,
              projectId: args.projectId,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Client Activity Comment
    addClientActivityComment: {
      type: ClientActivityCommentType,
      args: {
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const clientActivityComment = new ClientActivityComment({
          commentText: args.commentText,
          createdAt: args.createdAt,
          clientId: args.clientId,
        });

        return clientActivityComment.save();
      },
    },

    // Delete a Client Activity Comment
    deleteClientActivityComment: {
      type: ClientActivityCommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        ClientActivityCommentReply.find({ commentId: args.id }).then(
          (clientActivityCommentReplies) => {
            clientActivityCommentReplies.forEach(
              (clientActivityCommentReply) => {
                clientActivityCommentReply.remove();
              }
            );
          }
        );
        return ClientActivityComment.findByIdAndRemove(args.id);
      },
    },

    // Update a Client Activity Comment
    updateClientActivityComment: {
      type: ClientActivityCommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const clientActivityComment = new ClientActivityComment({
          commentText: args.commentText,
          createdAt: args.createdAt,
          clientId: args.clientId,
        });

        return clientActivityComment.save();
      },
    },

    // Add a Client Activity Comment Reply
    addClientActivityCommentReply: {
      type: ClientActivityCommentReplyType,
      args: {
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const clientActivityCommentReply = new ClientActivityCommentReply({
          commentText: args.commentText,
          createdAt: args.createdAt,
          commentId: args.commentId,
        });

        return clientActivityCommentReply.save();
      },
    },

    // Delete a Client Activity Comment Reply
    deleteClientActivityCommentReply: {
      type: ClientActivityCommentReplyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ClientActivityCommentReply.findByIdAndRemove(args.id);
      },
    },

    // Update a Client Activity Comment Reply
    updateClientActivityCommentReply: {
      type: ClientActivityCommentReplyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const clientActivityCommentReply = new ClientActivityCommentReply({
          commentText: args.commentText,
          createdAt: args.createdAt,
          commentId: args.commentId,
        });

        return clientActivityCommentReply.save();
      },
    },

    // Add a Project Activity Comment Reply
    addProjectActivityCommentReply: {
      type: ProjectActivityCommentReplyType,
      args: {
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const projectActivityCommentReply = new ProjectActivityCommentReply({
          commentText: args.commentText,
          createdAt: args.createdAt,
          commentId: args.commentId,
        });

        return projectActivityCommentReply.save();
      },
    },

    // Delete a Project Activity Comment Reply
    deleteProjectActivityCommentReply: {
      type: ProjectActivityCommentReplyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ProjectActivityCommentReply.findByIdAndRemove(args.id);
      },
    },

    // Update a Project Activity Comment Reply
    updateProjectActivityCommentReply: {
      type: ProjectActivityCommentReplyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        commentId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const projectActivityCommentReply = new ProjectActivityCommentReply({
          commentText: args.commentText,
          createdAt: args.createdAt,
          commentId: args.commentId,
        });

        return projectActivityCommentReply.save();
      },
    },

    // Add a Ticket
    addTicket: {
      type: TicketType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        typeOfTicket: {
          type: new GraphQLEnumType({
            name: "TypeOfTicket",
            values: {
              userStory: { value: "User Story" },
              defect: { value: "Defect" },
            },
          }),
          defaultValue: "User Story",
        },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "TicketStatus",
            values: {
              pre: { value: "Ready" },
              middle: { value: "In Progress" },
              old: { value: "Done" },
            },
          }),
          defaultValue: "Ready",
        },
        blocked: { type: GraphQLBoolean },
        blockedReason: { type: GraphQLString },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        const ticket = new Ticket({
          title: args.title,
          typeOfTicket: args.typeOfTicket,
          description: args.description,
          status: args.status,
          blocked: args.blocked,
          blockedReason: args.blockedReason,
          projectId: args.projectId,
          createdAt: args.createdAt,
        });

        return ticket.save();
      },
    },

    // Delete a ticket
    deleteTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndRemove(args.id);
      },
    },

    // Update an ticket
    updateTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        typeOfTicket: {
          type: new GraphQLEnumType({
            name: "TypeOfTicketUpdate",
            values: {
              userStory: { value: "User Story" },
              defect: { value: "Defect" },
            },
          }),
          defaultValue: "User Story",
        },
        description: { type: GraphQLString },
        blocked: { type: GraphQLBoolean },
        blockedReason: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "TicketStatusUpdate",
            values: {
              pre: { value: "Ready" },
              middle: { value: "In Progress" },
              old: { value: "Done" },
            },
          }),
        },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              typeOfTicket: args.typeOfTicket,
              description: args.description,
              status: args.status,
              blocked: args.blocked,
              blockedReason: args.blockedReason,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
