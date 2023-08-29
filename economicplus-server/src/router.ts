import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { ensureAuthenticated } from "./plugins/ensureAuthenticated"
import { AddCategoryController } from "./useCases/addCategory/AddCategoryController"
import { AddFinanceController } from "./useCases/addFinance/AddFinanceController"
import { AddGoalsController } from "./useCases/addGoals/AddGoalsController"
import { DeleteCategoryController } from "./useCases/deleteCategory/DeleteCategoryController"
import { DeleteFinanceController } from "./useCases/deleteFinance/DeleteFinanceController"
import { DeleteGoalsController } from "./useCases/deleteGoals/DeleteGoalsController"
import { EditCategoryController } from "./useCases/editCategory/EditCategoryController"
import { EditFinanceController } from "./useCases/editFinance/EditFinanceController"
import { EditGoalsController } from "./useCases/editGoals/EditGoalsController"
import { EditUserController } from "./useCases/editUser/EditUserController"
import { ListAllCategoriesController } from "./useCases/listAllCategories/ListAllCategoriesController"
import { ListCategoriesController } from "./useCases/listCategories/ListCategoriesController"
import { ListFinanceController } from "./useCases/listFinance/ListFinanceController"
import { ListPendenciesController } from "./useCases/listPendencies/ListPendenciesController"
import { MeController } from "./useCases/me/MeController"
import { RefreshTokenController } from "./useCases/refreshToken/RefreshTokenController"
import { ResetPasswordController } from "./useCases/resetPassword/ResetPasswordController"
import { SendEmailVerificationController } from "./useCases/sendEmailVerification/SendEmailVerificationController"
import { SendForgotPasswordMailController } from "./useCases/sendForgotPasswordMail/SendForgotPasswordMailController"
import { SignInController } from "./useCases/signIn/SignInController"
import { SignUpController } from "./useCases/signUp/SignUpController"
import { TotalFinancesController } from "./useCases/totalFinances/TotalFinancesController"
import { ValidateEmailController } from "./useCases/validateEmail/ValidateEmailController"
import { ViewGoalsController } from "./useCases/viewGoals/ViewGoalsController"

const refreshTokenController = new RefreshTokenController()
const signUpController = new SignUpController()
const signInController = new SignInController()
const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const sendEmailVerificationController = new SendEmailVerificationController()
const resetPasswordController = new ResetPasswordController()
const validateEmailController = new ValidateEmailController()
const meController = new MeController()

const totalFinancesController = new TotalFinancesController()
const listAllCategoriesController = new ListAllCategoriesController()
const addFinanceController = new AddFinanceController()
const editFinanceController = new EditFinanceController()
const deleteFinanceController = new DeleteFinanceController()
const addCategoryController = new AddCategoryController()
const editCategoryController = new EditCategoryController()
const deleteCategoryController = new DeleteCategoryController()
const listFinanceController = new ListFinanceController()
const listPendenciesController = new ListPendenciesController()
const listCategoriesController = new ListCategoriesController()
const addGoalsController = new AddGoalsController()
const editGoalsController = new EditGoalsController()
const viewGoalsController = new ViewGoalsController()
const deleteGoalsController = new DeleteGoalsController()
const editUserController = new EditUserController()

export async function router(fastify: FastifyInstance): Promise<void> {
  fastify.post("/session", async (request: FastifyRequest, reply: FastifyReply) => {
    await signInController.handle(request, reply)
  })

  fastify.post("/signup", async (request: FastifyRequest, reply: FastifyReply) => {
    await signUpController.handle(request, reply)
  })

  fastify.post("/email/validate", async (request: FastifyRequest, reply: FastifyReply) => {
    await validateEmailController.handle(request, reply)
  })

  fastify.post("/send/email/forgot", async (request: FastifyRequest, reply: FastifyReply) => {
    await sendForgotPasswordMailController.handle(request, reply)
  })

  fastify.post("/password/reset", async (request: FastifyRequest, reply: FastifyReply) => {
    await resetPasswordController.handle(request, reply)
  })

  fastify.get(
    "/send/email/verification",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await sendEmailVerificationController.handle(request, reply)
    }
  )

  fastify.post(
    "/edit/user",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await editUserController.handle(request, reply)
    }
  )

  fastify.get(
    "/total/finances",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await totalFinancesController.handle(request, reply)
    }
  )

  fastify.post(
    "/add/finance",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addFinanceController.handle(request, reply)
    }
  )

  fastify.get(
    "/list/finance",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await listFinanceController.handle(request, reply)
    }
  )

  fastify.get(
    "/list/pendencies",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await listPendenciesController.handle(request, reply)
    }
  )

  fastify.post(
    "/edit/finance",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await editFinanceController.handle(request, reply)
    }
  )

  fastify.post(
    "/delete/finance",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteFinanceController.handle(request, reply)
    }
  )

  fastify.post(
    "/add/category",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addCategoryController.handle(request, reply)
    }
  )

  fastify.get(
    "/list/categories",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await listCategoriesController.handle(request, reply)
    }
  )

  fastify.get(
    "/all/categories",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await listAllCategoriesController.handle(request, reply)
    }
  )

  fastify.post(
    "/edit/category",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await editCategoryController.handle(request, reply)
    }
  )

  fastify.post(
    "/delete/category",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteCategoryController.handle(request, reply)
    }
  )

  fastify.post(
    "/add/goals",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addGoalsController.handle(request, reply)
    }
  )

  fastify.get(
    "/view/goals",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await viewGoalsController.handle(request, reply)
    }
  )

  fastify.post(
    "/edit/goals",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await editGoalsController.handle(request, reply)
    }
  )

  fastify.post(
    "/delete/goals",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteGoalsController.handle(request, reply)
    }
  )

  fastify.get(
    "/me",
    {
      onRequest: [ensureAuthenticated],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await meController.handle(request, reply)
    }
  )

  // disabled in frontend
  /* 
    fastify.post("/refresh", async (request: FastifyRequest, reply: FastifyReply) => {
      await refreshTokenController.handle(request, reply)
    }) */
}
