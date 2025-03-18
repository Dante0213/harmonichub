
import * as z from "zod";

// 비밀번호 변경 폼 스키마
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(6, "현재 비밀번호는 최소 6자 이상이어야 합니다."),
    newPassword: z.string().min(6, "새 비밀번호는 최소 6자 이상이어야 합니다."),
    confirmPassword: z.string().min(6, "비밀번호 확인은 최소 6자 이상이어야 합니다."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
