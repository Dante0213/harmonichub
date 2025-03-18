
import * as z from "zod";

// 기본 정보 변경 폼 스키마
export const basicInfoSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  nickname: z.string().min(2, "닉네임은 최소 2자 이상이어야 합니다."),
  phone: z.string().min(10, "연락처는 최소 10자 이상이어야 합니다."),
  address: z.string().min(5, "주소는 최소 5자 이상이어야 합니다."),
});
