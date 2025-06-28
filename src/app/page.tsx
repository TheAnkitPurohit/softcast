import React from 'react'

const Page = () => {
  return (
    <>
      <div className='w-full px-72 py-5 bg-white inline-flex justify-between items-center'>
        <div className='flex justify-center items-center gap-8'>
          <div className='flex justify-start items-center gap-2'>
            <div className='w-10 h-10 relative overflow-hidden'>
              <div className='w-10 h-10 left-0 top-0 absolute' />
              <div className='w-7 h-6 left-[5px] top-[11.25px] absolute outline outline-[2.50px] outline-offset-[-1.25px] outline-blue-700' />
              <div className='w-3 h-[5px] left-[13.75px] top-[6.25px] absolute outline outline-[2.50px] outline-offset-[-1.25px] outline-blue-700' />
              <div className='w-7 h-1 left-[5px] top-[19.74px] absolute outline outline-[2.50px] outline-offset-[-1.25px] outline-blue-700' />
              <div className='w-1 h-0 left-[18.12px] top-[18.75px] absolute outline outline-[2.50px] outline-offset-[-1.25px] outline-blue-700' />
            </div>
            <div className='justify-start text-zinc-900 text-2xl font-semibold leading-10'>
              MyJob
            </div>
          </div>
          <div className='w-[668px] h-12 relative bg-white rounded-[5px] outline outline-1 outline-offset-[-1px] outline-zinc-200'>
            <div className='left-[24px] top-[9px] absolute inline-flex justify-center items-center gap-5'>
              <div className='flex justify-center items-center gap-3'>
                <img
                  className='w-6 h-4'
                  src='https://placehold.co/24x16'
                  alt='India'
                />
                <div className='justify-start text-zinc-900 text-sm font-medium leading-tight'>
                  India
                </div>
                <div className='w-4 h-4 relative'>
                  <div className='w-4 h-4 left-0 top-0 absolute' />
                  <div className='w-2.5 h-[5px] left-[3px] top-[6px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-gray-400' />
                </div>
              </div>
              <div className='w-8 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-zinc-200'></div>
              <div className='flex justify-start items-start gap-3'>
                <div className='w-6 h-6 relative overflow-hidden'>
                  <div className='w-4 h-4 left-[3px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-blue-600' />
                  <div className='w-1 h-1 left-[16.65px] top-[16.65px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-blue-600' />
                </div>
                <div className='justify-start text-gray-400 text-base font-normal leading-normal'>
                  Job tittle, keyword, company
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-start items-center gap-3'>
          <div className='px-6 py-3 rounded-[3px] outline outline-1 outline-offset-[-1px] outline-indigo-200 flex justify-center items-center gap-3'>
            <div className='justify-start text-blue-700 text-base font-semibold capitalize leading-normal'>
              Sign in
            </div>
          </div>
          <div className='px-6 py-3 bg-blue-700 rounded-[3px] flex justify-center items-center gap-3'>
            <div className='justify-start text-white text-base font-semibold capitalize leading-normal'>
              Post a Jobs
            </div>
          </div>
        </div>
      </div>

      <div className='w-full h-full bg-gray-100/60'>
        <div className='w-full relative'>
          <div className='left-[300px] top-[109px] absolute inline-flex flex-col justify-start items-start gap-8'>
            <div className='flex flex-col justify-start items-start gap-6'>
              <div className='w-[652px] justify-start text-zinc-900 text-6xl font-medium leading-[64px]'>
                Find a job that suits your interest & skills.
              </div>
              <div className='w-[536px] justify-start text-gray-500 text-lg font-normal leading-7'>
                Aliquam vitae turpis in diam convallis finibus in at risus.
                Nullam in scelerisque leo, eget sollicitudin velit bestibulum.
              </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-6'>
              <div className='p-3 bg-white rounded-lg shadow-[0px_12px_40px_0px_rgba(0,44,109,0.04)] outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-start items-center gap-3'>
                <div className='flex justify-center items-center'>
                  <div className='w-72 h-14 relative bg-white rounded-[5px]'>
                    <div className='left-[54px] top-[16px] absolute justify-start text-gray-400 text-base font-normal leading-normal'>
                      Job tittle, Keyword...
                    </div>
                    <div className='w-6 h-6 left-[18px] top-[16px] absolute overflow-hidden'>
                      <div className='w-4 h-4 left-[3px] top-[3px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-blue-600' />
                      <div className='w-1 h-1 left-[16.65px] top-[16.65px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-blue-600' />
                    </div>
                  </div>
                  <div className='w-8 h-0 origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-zinc-200'></div>
                  <div className='w-56 h-14 relative bg-white rounded-[5px]'>
                    <div className='left-[54px] top-[16px] absolute justify-start text-gray-400 text-base font-normal leading-normal'>
                      Your Location
                    </div>
                    <div className='w-6 h-6 left-[18px] top-[16px] absolute overflow-hidden'>
                      <div className='w-4 h-5 left-[3px] top-[1px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-blue-600' />
                      <div className='w-1.5 h-1.5 left-[9px] top-[7px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-blue-600' />
                    </div>
                  </div>
                </div>
                <div className='px-8 py-4 bg-blue-700 rounded flex justify-center items-center gap-3'>
                  <div className='justify-start text-white text-base font-semibold capitalize leading-normal'>
                    Find Job
                  </div>
                </div>
              </div>
              <div className='inline-flex justify-start items-start'>
                <div className='text-center justify-start text-gray-400 text-sm font-normal leading-tight'>
                  Suggestion:
                </div>
                <div className='text-center justify-start text-neutral-600 text-sm font-normal leading-tight'>
                  {' '}
                  Designer,
                </div>
                <div className='text-center justify-start text-neutral-600 text-sm font-normal leading-tight'>
                  {' '}
                  Programing,
                </div>
                <div className='text-center justify-start text-blue-700 text-sm font-medium leading-tight'>
                  {' '}
                  Digital Marketing,
                </div>
                <div className='text-center justify-start text-neutral-600 text-sm font-normal leading-tight'>
                  {' '}
                  Video,
                </div>
                <div className='text-center justify-start text-neutral-600 text-sm font-normal leading-tight'>
                  {' '}
                  Animation.
                </div>
              </div>
            </div>
          </div>
          <div className='w-[492px] h-96 left-[1128px] top-[100px] absolute overflow-hidden'>
            <div className='w-32 h-1.5 left-[349.41px] top-[58.78px] absolute bg-neutral-300' />
            <div className='w-32 h-px left-[349.81px] top-[58.75px] absolute bg-neutral-300' />
            <div className='w-4 h-12 left-[355.95px] top-[9.41px] absolute bg-neutral-300' />
            <div className='w-4 h-9 left-[370.67px] top-[25.15px] absolute bg-neutral-300' />
            <div className='w-2 h-[4.99px] left-[370.57px] top-[15.30px] absolute bg-neutral-300' />
            <div className='w-6 h-11 left-[378px] top-[15.97px] absolute bg-neutral-300' />
            <div className='w-1 h-14 left-[397.23px] top-[6.82px] absolute bg-neutral-300' />
            <div className='w-4 h-14 left-[397.26px] top-[5.32px] absolute bg-neutral-300' />
            <div className='w-5 h-2 left-[378.39px] top-[15.09px] absolute bg-neutral-300' />
            <div className='w-2.5 h-12 left-[409.98px] top-[12.53px] absolute bg-neutral-300' />
            <div className='w-px h-2.5 left-[418.72px] top-[7.92px] absolute bg-neutral-300' />
            <div className='w-[4.90px] h-12 left-[419.34px] top-[7.46px] absolute bg-neutral-300' />
            <div className='w-2.5 h-2 left-[366.03px] top-[63.87px] absolute bg-neutral-300' />
            <div className='w-[2.88px] h-1.5 left-[375.89px] top-[64.66px] absolute bg-neutral-300' />
            <div className='w-0.5 h-1.5 left-[374.52px] top-[65.41px] absolute bg-neutral-300' />
            <div className='w-[2.56px] h-[4.71px] left-[374.82px] top-[65px] absolute bg-neutral-300' />
            <div className='w-9 h-1.5 left-[432.01px] top-[52.46px] absolute bg-neutral-300' />
            <div className='w-0.5 h-2 left-[437.58px] top-[46.30px] absolute bg-neutral-300' />
            <div className='w-7 h-2 left-[437.80px] top-[45.93px] absolute bg-neutral-300' />
            <div className='w-px h-1.5 left-[400.88px] top-[161.08px] absolute bg-neutral-300' />
            <div className='w-20 h-px left-[400.88px] top-[160.14px] absolute bg-neutral-300' />
            <div className='w-20 h-px left-[401.79px] top-[165.21px] absolute bg-neutral-300' />
            <div className='w-px h-1 left-[486.74px] top-[161.08px] absolute bg-neutral-300' />
            <div className='w-1 h-3 left-[409.35px] top-[148.54px] absolute bg-neutral-300' />
            <div className='w-[3.26px] h-3 left-[426.33px] top-[148.50px] absolute bg-neutral-300' />
            <div className='w-6 h-[3.40px] left-[406.36px] top-[145.64px] absolute bg-neutral-300' />
            <div className='w-6 h-1 left-[406.46px] top-[143.50px] absolute bg-neutral-300' />
            <div className='w-4 h-6 left-[401.12px] top-[119.33px] absolute bg-neutral-300' />
            <div className='w-3 h-8 left-[412.63px] top-[110.25px] absolute bg-neutral-300' />
            <div className='w-2.5 h-5 left-[404.42px] top-[124.09px] absolute bg-neutral-300' />
            <div className='w-[2.93px] h-1.5 left-[414.67px] top-[121.76px] absolute bg-neutral-300' />
            <div className='w-1 h-[5.02px] left-[418.64px] top-[117.26px] absolute bg-neutral-300' />
            <div className='w-2 h-2 left-[423.04px] top-[121.04px] absolute bg-neutral-300' />
            <div className='w-2 h-6 left-[425.31px] top-[122.24px] absolute bg-neutral-300' />
            <div className='w-2 h-3.5 left-[421.84px] top-[127.88px] absolute bg-neutral-300' />
            <div className='w-1.5 h-1 left-[411.23px] top-[155.98px] absolute bg-neutral-300' />
            <div className='w-3.5 h-2.5 left-[410.47px] top-[151.18px] absolute bg-neutral-300' />
            <div className='w-3.5 h-2.5 left-[413.42px] top-[148.55px] absolute bg-neutral-300' />
            <div className='w-2 h-1.5 left-[419.47px] top-[147.98px] absolute bg-neutral-300' />
            <div className='w-8 h-1.5 left-[445.28px] top-[154.08px] absolute bg-neutral-300' />
            <div className='w-6 h-1 left-[453.03px] top-[150.22px] absolute bg-neutral-300' />
            <div className='w-2.5 h-[3.28px] left-[460.84px] top-[146.81px] absolute bg-neutral-300' />
            <div className='w-1.5 h-1.5 left-[405.69px] top-[166.30px] absolute bg-neutral-300' />
            <div className='w-2.5 h-1.5 left-[410.14px] top-[165.82px] absolute bg-neutral-300' />
            <div className='w-0.5 h-1 left-[414.72px] top-[166.35px] absolute bg-neutral-300' />
            <div className='w-2.5 h-1.5 left-[459.52px] top-[166px] absolute bg-neutral-300' />
            <div className='w-[1.69px] h-1.5 left-[469.08px] top-[165.57px] absolute bg-neutral-300' />
            <div className='w-1.5 h-1.5 left-[469.24px] top-[165.98px] absolute bg-neutral-300' />
            <div className='w-px h-8 left-[233.93px] top-[58.78px] absolute bg-neutral-300' />
            <div className='w-10 h-px left-[234.26px] top-[90.08px] absolute bg-neutral-300' />
            <div className='w-10 h-px left-[234.26px] top-[58.75px] absolute bg-neutral-300' />
            <div className='w-px h-8 left-[273.08px] top-[58.78px] absolute bg-neutral-300' />
            <div className='w-1 h-[4.72px] left-[253.35px] top-[55.07px] absolute bg-neutral-300' />
            <div className='w-px h-6 left-[236.03px] top-[62.34px] absolute bg-neutral-300' />
            <div className='w-9 h-px left-[236.06px] top-[87.07px] absolute bg-neutral-300' />
            <div className='w-px h-6 left-[271.02px] top-[62.05px] absolute bg-neutral-300' />
            <div className='w-9 h-px left-[236.35px] top-[62.61px] absolute bg-neutral-300' />
            <div className='w-6 h-1.5 left-[236.39px] top-[79.65px] absolute bg-neutral-300' />
            <div className='w-4 h-[3.28px] left-[250.74px] top-[78.47px] absolute bg-neutral-300' />
            <div className='w-[5.15px] h-[4.85px] left-[251.17px] top-[69.66px] absolute bg-neutral-300' />
            <div className='w-2 h-2 left-[431.63px] top-[63.81px] absolute bg-neutral-300' />
            <div className='w-1.5 h-1.5 left-[438.98px] top-[64.53px] absolute bg-neutral-300' />
            <div className='w-0.5 h-[5.12px] left-[437.22px] top-[63.38px] absolute bg-neutral-300' />
            <div className='w-px h-4 left-[407.79px] top-[207.35px] absolute bg-neutral-300' />
            <div className='w-10 h-px left-[393.84px] top-[223.48px] absolute bg-neutral-300' />
            <div className='w-px h-2.5 left-[415.52px] top-[224.98px] absolute bg-neutral-300' />
            <div className='w-9 h-px left-[393.47px] top-[235.23px] absolute bg-neutral-300' />
            <div className='w-px h-2 left-[402.64px] top-[236.73px] absolute bg-neutral-300' />
            <div className='w-1.5 h-2 left-[405.25px] top-[51.52px] absolute bg-neutral-300' />
            <div className='w-3 h-0.5 left-[399.15px] top-[16.77px] absolute bg-neutral-300' />
            <div className='w-3 h-[3.06px] left-[397.68px] top-[12.17px] absolute bg-neutral-300' />
            <div className='w-2.5 h-6 left-[382.74px] top-[34.27px] absolute bg-neutral-300' />
            <div className='w-20 h-14 left-[171.32px] top-[214.34px] absolute bg-white outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-3 h-2.5 left-[217.99px] top-[249.55px] absolute bg-zinc-900' />
            <div className='w-2.5 h-2 left-[185.15px] top-[257.88px] absolute bg-zinc-900' />
            <div className='w-2 h-2 left-[193.62px] top-[261.46px] absolute bg-zinc-900' />
            <div className='w-14 h-16 left-[219.48px] top-[169.13px] absolute bg-blue-700' />
            <div className='w-9 h-9 left-[227.96px] top-[169.57px] absolute bg-zinc-900' />
            <div className='w-2.5 h-2.5 left-[253.92px] top-[209.50px] absolute bg-zinc-900' />
            <div className='w-10 h-6 left-[219.23px] top-[214.30px] absolute bg-zinc-900' />
            <div className='w-2.5 h-6 left-[219.36px] top-[203.67px] absolute bg-zinc-900' />
            <div className='w-16 h-20 left-[192.82px] top-[190.07px] absolute opacity-40 bg-sky-950' />
            <div className='w-7 h-16 left-[230.11px] top-[205.96px] absolute opacity-40 bg-sky-950' />
            <div className='w-24 h-40 left-[248.94px] top-[161.34px] absolute bg-blue-700' />
            <div className='w-9 h-2 left-[264.41px] top-[162.52px] absolute bg-zinc-900' />
            <div className='w-20 h-32 left-[248.47px] top-[188.53px] absolute bg-zinc-900' />
            <div className='w-9 h-4 left-[315.46px] top-[160.20px] absolute bg-zinc-900' />
            <div className='w-3 h-20 left-[332.96px] top-[223px] absolute bg-zinc-900' />
            <div className='w-20 h-20 left-[260.16px] top-[210.10px] absolute opacity-40 bg-sky-950' />
            <div className='w-16 h-14 left-[281.32px] top-[226.86px] absolute opacity-40 bg-sky-950' />
            <div className='w-[485.01px] h-32 left-[4.86px] top-[255.13px] absolute bg-white outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-96 h-14 left-[3.53px] top-[327.43px] absolute outline outline-[6.29px] outline-offset-[-3.14px] outline-zinc-200' />
            <div className='w-20 h-24 left-[406.95px] top-[292.18px] absolute outline outline-[6.29px] outline-offset-[-3.14px] outline-zinc-200' />
            <div className='w-10 h-9 left-[321.01px] top-[303.22px] absolute bg-zinc-900' />
            <div className='w-14 h-2 left-[321.31px] top-[336.12px] absolute bg-zinc-900' />
            <div className='w-11 h-2 left-[362.06px] top-[303.05px] absolute bg-zinc-900' />
            <div className='w-8 h-8 left-[376.46px] top-[310.87px] absolute bg-zinc-900' />
            <div className='w-10 h-1.5 left-[334.02px] top-[331.13px] absolute bg-zinc-900' />
            <div className='w-6 h-[4.72px] left-[353.18px] top-[327.65px] absolute bg-zinc-900' />
            <div className='w-9 h-1.5 left-[347.34px] top-[319.54px] absolute bg-zinc-900' />
            <div className='w-5 h-1 left-[362.03px] top-[316.19px] absolute bg-zinc-900' />
            <div className='w-14 h-3.5 left-[347.53px] top-[341.65px] absolute bg-zinc-900' />
            <div className='w-6 h-9 left-[398.33px] top-[319.50px] absolute bg-zinc-900' />
            <div className='w-1.5 h-[1.47px] left-[371.27px] top-[346.94px] absolute bg-zinc-900' />
            <div className='w-5 h-[2.76px] left-[381.88px] top-[347.41px] absolute bg-zinc-900' />
            <div className='w-[5.17px] h-px left-[382.22px] top-[340.51px] absolute bg-zinc-900' />
            <div className='w-3.5 h-[2.39px] left-[390.79px] top-[340.40px] absolute bg-zinc-900' />
            <div className='w-4 h-0.5 left-[390.09px] top-[334.12px] absolute bg-zinc-900' />
            <div className='w-2 h-0.5 left-[355.54px] top-[345.52px] absolute bg-zinc-900' />
            <div className='w-8 h-2 left-[372.14px] top-[289.66px] absolute bg-zinc-900' />
            <div className='w-9 h-1 left-[374.01px] top-[290.13px] absolute bg-zinc-900' />
            <div className='w-2 h-1 left-[402.05px] top-[293.33px] absolute bg-zinc-900' />
            <div className='w-[2.70px] h-[5.18px] left-[401.59px] top-[291.17px] absolute bg-zinc-900' />
            <div className='w-5 h-5 left-[128.04px] top-[156.15px] absolute bg-blue-700' />
            <div className='w-3 h-4 left-[133.77px] top-[155.49px] absolute bg-blue-700' />
            <div className='w-1 h-3.5 left-[145.81px] top-[107.79px] absolute bg-blue-400' />
            <div className='w-5 h-6 left-[146.55px] top-[99.72px] absolute bg-blue-400' />
            <div className='w-7 h-7 left-[49.39px] top-[115.13px] absolute bg-blue-400' />
            <div className='w-3.5 h-4 left-[51.49px] top-[123.53px] absolute bg-blue-400' />
            <div className='w-5 h-7 left-[108.98px] top-[59.61px] absolute bg-blue-700' />
            <div className='w-2 h-1.5 left-[116.97px] top-[86.05px] absolute bg-blue-700' />
            <div className='w-1 h-[4.74px] left-[118.31px] top-[91.10px] absolute bg-blue-700' />
            <div className='w-9 h-11 left-[92.81px] top-[13.82px] absolute bg-blue-700' />
            <div className='w-1 h-1 left-[67.28px] top-[175.09px] absolute bg-blue-700' />
            <div className='w-1 h-1 left-[34.33px] top-[142.40px] absolute bg-blue-700' />
            <div className='w-[3.20px] h-[3.30px] left-[44.83px] top-[145.45px] absolute bg-blue-400' />
            <div className='w-[3.20px] h-[3.30px] left-[180.02px] top-[61.51px] absolute bg-blue-400' />
            <div className='w-[3.31px] h-1 left-[202.37px] top-[113.10px] absolute bg-blue-400' />
            <div className='w-7 h-20 left-[175.36px] top-[87.52px] absolute bg-zinc-900' />
            <div className='w-20 h-20 left-0 top-[87.17px] absolute bg-zinc-900' />
            <div className='w-24 h-12 left-[15.32px] top-[162.59px] absolute bg-zinc-900' />
            <div className='w-2 h-4 left-[42.29px] top-[180.05px] absolute bg-zinc-900' />
            <div className='w-4 h-5 left-[171.28px] top-[85.72px] absolute bg-zinc-900' />
            <div className='w-14 h-5 left-[36.53px] top-[149.19px] absolute bg-zinc-900' />
            <div className='w-3 h-4 left-[45.58px] top-[129.70px] absolute bg-zinc-900' />
            <div className='w-8 h-4 left-[45.64px] top-[114.85px] absolute bg-zinc-900' />
            <div className='w-5 h-3.5 left-[57.46px] top-[130.78px] absolute bg-zinc-900' />
            <div className='w-4 h-2.5 left-[50.03px] top-[119.87px] absolute bg-zinc-900' />
            <div className='w-2 h-1.5 left-[53.24px] top-[126.04px] absolute bg-zinc-900' />
            <div className='w-3 h-2.5 left-[54.78px] top-[125.41px] absolute bg-zinc-900' />
            <div className='w-2 h-1.5 left-[57.86px] top-[131.34px] absolute bg-zinc-900' />
            <div className='w-3 h-2 left-[59.55px] top-[132.43px] absolute bg-zinc-900' />
            <div className='w-3 h-6 left-[124.95px] top-[157.67px] absolute bg-zinc-900' />
            <div className='w-3 h-7 left-[135.23px] top-[155px] absolute bg-zinc-900' />
            <div className='w-6 h-4 left-[142.44px] top-[107.56px] absolute bg-zinc-900' />
            <div className='w-7 h-6 left-[142.34px] top-[97.16px] absolute bg-zinc-900' />
            <div className='w-[3.29px] h-3.5 left-[147.34px] top-[108.06px] absolute bg-zinc-900' />
            <div className='w-7 h-7 left-[103.68px] top-[56.43px] absolute bg-zinc-900' />
            <div className='w-4 h-2 left-[111.03px] top-[81.68px] absolute bg-zinc-900' />
            <div className='w-3 h-1.5 left-[113.75px] top-[87.87px] absolute bg-zinc-900' />
            <div className='w-1.5 h-1 left-[116.67px] top-[93.13px] absolute bg-zinc-900' />
            <div className='w-2 h-2.5 left-[108.91px] top-[69.25px] absolute bg-zinc-900' />
            <div className='w-[3.21px] h-4 left-[114.85px] top-[66.91px] absolute bg-zinc-900' />
            <div className='w-2 h-2.5 left-[115.68px] top-[67.57px] absolute bg-zinc-900' />
            <div className='w-2.5 h-3.5 left-[76.61px] top-[170.16px] absolute bg-zinc-900' />
            <div className='w-9 h-3.5 left-[76.68px] top-[157.74px] absolute bg-zinc-900' />
            <div className='w-7 h-3.5 left-[83.51px] top-[170.09px] absolute bg-zinc-900' />
            <div className='w-2.5 h-2.5 left-[88.88px] top-[165.19px] absolute bg-zinc-900' />
            <div className='w-5 h-7 left-[111.43px] top-[118.80px] absolute bg-zinc-900' />
            <div className='w-[4.74px] h-1 left-[102.15px] top-[121.75px] absolute bg-zinc-900' />
            <div className='w-1.5 h-2 left-[152.17px] top-[61.98px] absolute bg-zinc-900' />
            <div className='w-12 h-10 left-[94.70px] top-[79.27px] absolute bg-zinc-900' />
            <div className='w-[2.92px] h-3.5 left-[85.23px] top-[52.66px] absolute bg-zinc-900' />
            <div className='w-3.5 h-2.5 left-[86.09px] top-[57.04px] absolute bg-zinc-900' />
            <div className='w-8 h-11 left-[86.72px] top-[8.78px] absolute bg-zinc-900' />
            <div className='w-8 h-10 left-[100.21px] top-[15.32px] absolute bg-zinc-900' />
            <div className='w-4 h-2.5 left-[118.53px] top-0 absolute bg-zinc-900' />
            <div className='w-1.5 h-2.5 left-[129.59px] top-[6.52px] absolute bg-zinc-900' />
            <div className='w-3.5 h-1.5 left-[117.95px] top-[8.82px] absolute bg-zinc-900' />
            <div className='w-3 h-1.5 left-[116px] top-[12.49px] absolute bg-zinc-900' />
            <div className='w-3.5 h-1.5 left-[86.86px] top-[51.72px] absolute bg-zinc-900' />
            <div className='w-6 h-8 left-[92.09px] top-[22.10px] absolute bg-zinc-900' />
            <div className='w-6 h-8 left-[103.77px] top-[14.46px] absolute bg-zinc-900' />
            <div className='w-1 h-[2.95px] left-[85.69px] top-[62.63px] absolute bg-zinc-900' />
            <div className='w-[2.89px] h-1 left-[85.88px] top-[62.68px] absolute bg-zinc-900' />
            <div className='w-1.5 h-3 left-[79.81px] top-[69.19px] absolute bg-zinc-900' />
            <div className='w-3.5 h-2 left-[64.91px] top-[74.06px] absolute bg-zinc-900' />
            <div className='w-2 h-5 left-[159.06px] top-[157.27px] absolute bg-zinc-900' />
            <div className='w-1.5 h-2 left-[103.20px] top-[200.11px] absolute bg-zinc-900' />
            <div className='w-1.5 h-1.5 left-[158.14px] top-[135.98px] absolute bg-zinc-900' />
            <div className='w-5 h-4 left-[5.39px] top-[119.87px] absolute bg-zinc-900' />
            <div className='w-52 h-14 left-[119.19px] top-[273.64px] absolute bg-white outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-[1.53px] h-[3.11px] left-[251.39px] top-[328.93px] absolute bg-zinc-900' />
            <div className='w-20 h-7 left-[251.45px] top-[304.12px] absolute bg-zinc-900' />
            <div className='w-20 h-8 left-[250.79px] top-[302.33px] absolute bg-zinc-900' />
            <div className='w-3.5 h-1.5 left-[249.41px] top-[295.74px] absolute bg-zinc-900' />
            <div className='w-2.5 h-1.5 left-[263.01px] top-[294.05px] absolute bg-zinc-900' />
            <div className='w-2 h-1.5 left-[250.27px] top-[289.02px] absolute bg-zinc-900' />
            <div className='w-3.5 h-1.5 left-[258.06px] top-[289.14px] absolute bg-zinc-900' />
            <div className='w-8 h-3 left-[246.23px] top-[299.94px] absolute bg-zinc-900' />
            <div className='w-5 h-2.5 left-[247.42px] top-[308.58px] absolute bg-zinc-900' />
            <div className='w-3 h-1.5 left-[248.41px] top-[318px] absolute bg-zinc-900' />
            <div className='w-4 h-3.5 left-[249.86px] top-[306.11px] absolute bg-zinc-900' />
            <div className='w-2.5 h-2 left-[248.68px] top-[304.57px] absolute bg-zinc-900' />
            <div className='w-36 h-32 left-[99.51px] top-[209.97px] absolute bg-white outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-5 h-6 left-[161.21px] top-[253.89px] absolute bg-zinc-900' />
            <div className='w-3.5 h-3 left-[167.84px] top-[264.75px] absolute bg-zinc-900' />
            <div className='w-2.5 h-2.5 left-[171.52px] top-[268.96px] absolute bg-zinc-900' />
            <div className='w-1.5 h-1.5 left-[174.81px] top-[274.28px] absolute bg-zinc-900' />
            <div className='w-[3.24px] h-24 left-[248.80px] top-[230.02px] absolute outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-[2.98px] h-24 left-[249.02px] top-[229.94px] absolute outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-52 h-32 left-[137.62px] top-[223.19px] absolute opacity-10 bg-zinc-900' />
            <div className='w-5 h-5 left-[163.14px] top-[256.27px] absolute bg-blue-400' />
            <div className='w-20 h-12 left-[292.09px] top-[226.69px] absolute bg-white outline outline-[1.18px] outline-offset-[-0.59px] outline-zinc-900' />
            <div className='w-3 h-2.5 left-[338.70px] top-[257.23px] absolute bg-zinc-900' />
            <div className='w-2.5 h-2 left-[305.89px] top-[265.59px] absolute bg-zinc-900' />
            <div className='w-2 h-[3.30px] left-[306.27px] top-[273.14px] absolute bg-zinc-900' />
            <div className='w-2 h-2 left-[314.32px] top-[269.15px] absolute bg-zinc-900' />
            <div className='w-10 h-16 left-[336.67px] top-[174.64px] absolute bg-blue-700' />
            <div className='w-6 h-11 left-[351.31px] top-[175.62px] absolute bg-zinc-900' />
            <div className='w-1.5 h-3 left-[340.03px] top-[213.16px] absolute bg-zinc-900' />
            <div className='w-9 h-6 left-[339.99px] top-[219.79px] absolute bg-zinc-900' />
            <div className='w-[3.25px] h-7 left-[373.72px] top-[218.93px] absolute bg-zinc-900' />
            <div className='w-16 h-28 left-[311.37px] top-[173.28px] absolute opacity-30 bg-sky-950' />
            <div className='w-10 h-20 left-[334.99px] top-[198.44px] absolute opacity-30 bg-sky-950' />
            <div className='w-20 h-24 left-[265.83px] top-[80.11px] absolute bg-white' />
            <div className='w-24 h-20 left-[251.90px] top-[65.73px] absolute bg-gray-400' />
            <div className='w-8 h-12 left-[265.53px] top-[102.48px] absolute bg-zinc-900' />
            <div className='w-8 h-6 left-[295px] top-[131.66px] absolute bg-zinc-900' />
            <div className='w-1.5 h-6 left-[314.20px] top-[145.62px] absolute bg-zinc-900' />
            <div className='w-5 h-5 left-[298.36px] top-[153.56px] absolute bg-zinc-900' />
            <div className='w-3.5 h-3 left-[299.44px] top-[146.75px] absolute bg-zinc-900' />
            <div className='w-3.5 h-2 left-[299.20px] top-[147.25px] absolute bg-zinc-900' />
            <div className='w-3 h-1.5 left-[299.20px] top-[148.35px] absolute bg-zinc-900' />
            <div className='w-3 h-2.5 left-[299.66px] top-[148.87px] absolute bg-zinc-900' />
            <div className='w-2.5 h-1.5 left-[299.52px] top-[150.27px] absolute bg-zinc-900' />
            <div className='w-2.5 h-1.5 left-[300.07px] top-[150.42px] absolute bg-zinc-900' />
            <div className='w-2 h-1.5 left-[300.48px] top-[151.10px] absolute bg-zinc-900' />
            <div className='w-5 h-7 left-[262.73px] top-[103.51px] absolute bg-zinc-900' />
            <div className='w-3.5 h-[2.97px] left-[283.19px] top-[117.04px] absolute bg-zinc-900' />
            <div className='w-6 h-7 left-[295.55px] top-[101.64px] absolute bg-zinc-900' />
            <div className='w-[2.95px] h-2 left-[274.25px] top-[114.60px] absolute bg-zinc-900' />
            <div className='w-[3.20px] h-2 left-[305.69px] top-[112.34px] absolute bg-zinc-900' />
            <div className='w-2 h-3.5 left-[285.28px] top-[121.50px] absolute bg-zinc-900' />
            <div className='w-2 h-1.5 left-[292.55px] top-[137.56px] absolute bg-zinc-900' />
            <div className='w-[4.75px] h-0.5 left-[271.38px] top-[110.71px] absolute bg-zinc-900' />
            <div className='w-1.5 h-0.5 left-[302.89px] top-[108.62px] absolute bg-zinc-900' />
            <div className='w-3.5 h-1 left-[317.68px] top-[111.96px] absolute bg-zinc-900' />
            <div className='w-6 h-20 left-[320.75px] top-[69.77px] absolute opacity-40 bg-sky-950' />
            <div className='w-4 h-5 left-[288.31px] top-[79.24px] absolute opacity-50 bg-sky-950' />
            <div className='w-9 h-14 left-[301.91px] top-[96.98px] absolute opacity-25 bg-sky-950' />
            <div className='w-3.5 h-7 left-[305.60px] top-[146.70px] absolute opacity-40 bg-sky-950' />
            <div className='w-2.5 h-3 left-[281.72px] top-[123.16px] absolute opacity-40 bg-sky-950' />
          </div>
          <div className='w-[1920px] px-72 left-0 top-[582px] absolute inline-flex justify-between items-center'>
            <div className='p-5 bg-white rounded-lg flex justify-start items-center gap-5'>
              <div className='p-4 bg-sky-100 rounded flex justify-start items-start gap-2.5'>
                <div className='w-10 h-10 relative overflow-hidden'>
                  <div className='w-10 h-10 left-0 top-0 absolute' />
                  <div className='w-7 h-3.5 left-[5px] top-[19.74px] absolute opacity-20 bg-blue-700' />
                  <div className='w-7 h-6 left-[5px] top-[11.25px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-3 h-[5px] left-[13.75px] top-[6.25px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-7 h-1 left-[5px] top-[19.74px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-1 h-0 left-[18.12px] top-[18.75px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                </div>
              </div>
              <div className='inline-flex flex-col justify-start items-start gap-1.5'>
                <div className='w-44 justify-start text-zinc-900 text-2xl font-medium leading-loose'>
                  1,75,324
                </div>
                <div className='w-44 justify-start text-gray-500 text-base font-normal leading-normal'>
                  Live Job
                </div>
              </div>
            </div>
            <div className='p-5 bg-white rounded-lg shadow-[0px_12px_48px_0px_rgba(0,44,109,0.10)] flex justify-start items-center gap-5'>
              <div className='p-4 bg-blue-700 rounded flex justify-start items-start gap-2.5'>
                <div className='w-10 h-10 relative overflow-hidden'>
                  <div className='w-10 h-10 left-0 top-0 absolute' />
                  <div className='w-4 h-7 left-[5px] top-[5px] absolute opacity-20 bg-white' />
                  <div className='w-9 h-0 left-[2.50px] top-[33.75px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-4 h-7 left-[5px] top-[5px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-3 h-5 left-[22.50px] top-[15px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-[5px] h-0 left-[10px] top-[11.25px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-[5px] h-0 left-[12.50px] top-[21.25px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-[5px] h-0 left-[10px] top-[27.50px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-[2.50px] h-0 left-[27.50px] top-[27.50px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                  <div className='w-[2.50px] h-0 left-[27.50px] top-[21.25px] absolute outline outline-2 outline-offset-[-1px] outline-white' />
                </div>
              </div>
              <div className='inline-flex flex-col justify-start items-start gap-1.5'>
                <div className='w-44 justify-start text-zinc-900 text-2xl font-medium leading-loose'>
                  97,354
                </div>
                <div className='w-44 justify-start text-gray-500 text-base font-normal leading-normal'>
                  Companies
                </div>
              </div>
            </div>
            <div className='p-5 bg-white rounded-lg flex justify-start items-center gap-5'>
              <div className='p-4 bg-sky-100 rounded flex justify-start items-start gap-2.5'>
                <div className='w-10 h-10 relative overflow-hidden'>
                  <div className='w-10 h-10 left-0 top-0 absolute' />
                  <div className='w-4 h-4 left-[5.63px] top-[8.75px] absolute opacity-20 bg-blue-700' />
                  <div className='w-4 h-4 left-[5.63px] top-[8.75px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-2.5 h-4 left-[24.28px] top-[8.75px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-6 h-1.5 left-[2.50px] top-[25px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-3 h-1.5 left-[26.49px] top-[25px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                </div>
              </div>
              <div className='inline-flex flex-col justify-start items-start gap-1.5'>
                <div className='w-44 justify-start text-zinc-900 text-2xl font-medium leading-loose'>
                  38,47,154
                </div>
                <div className='w-44 justify-start text-gray-500 text-base font-normal leading-normal'>
                  Candidates
                </div>
              </div>
            </div>
            <div className='p-5 bg-white rounded-lg flex justify-start items-center gap-5'>
              <div className='p-4 bg-sky-100 rounded flex justify-start items-start gap-2.5'>
                <div className='w-10 h-10 relative overflow-hidden'>
                  <div className='w-10 h-10 left-0 top-0 absolute' />
                  <div className='w-7 h-3.5 left-[5px] top-[19.74px] absolute opacity-20 bg-blue-700' />
                  <div className='w-7 h-6 left-[5px] top-[11.25px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-3 h-[5px] left-[13.75px] top-[6.25px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-7 h-1 left-[5px] top-[19.74px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                  <div className='w-1 h-0 left-[18.12px] top-[18.75px] absolute outline outline-2 outline-offset-[-1px] outline-blue-700' />
                </div>
              </div>
              <div className='inline-flex flex-col justify-start items-start gap-1.5'>
                <div className='w-44 justify-start text-zinc-900 text-2xl font-medium leading-loose'>
                  7,532
                </div>
                <div className='w-44 justify-start text-gray-500 text-base font-normal leading-normal'>
                  New Jobs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
