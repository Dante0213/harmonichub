
export function UpgradeSuccessView() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h3 className="text-xl font-medium mb-2">검증이 완료되었습니다</h3>
      <p className="text-gray-500">전문가 회원으로 전환이 성공적으로 완료되었습니다.</p>
    </div>
  );
}
