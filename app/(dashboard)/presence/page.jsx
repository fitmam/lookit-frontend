'use client'
import React, { Fragment, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { Tab } from '@headlessui/react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import { Icon } from '@iconify/react'
import Pagination from '@/components/ui/Pagination'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import DataKehadiran from '@/components/presence/presence-data/page'
import RekapKehadiran from '@/components/presence/presence-records/page'
import Flatpickr from 'react-flatpickr'
import http from '@/app/helpers/http.helper'
import { getCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import EditPresentForm from '@/components/presence/h-presence-edit-form/page'
import DetailPresentForm from '@/components/presence/h-presence-edit-form/page'
import DeletePresentForm from '@/components/presence/h-presence-delete-form/page'
import EditArriveLateForm from '@/components/presence/ht-presence-edit-form/page'
import DetailArriveLateForm from '@/components/presence/ht-presence-detail-form/page'
import DeleteArriveLateForm from '@/components/presence/ht-presence-delete-form/page'
import EditGoEarlyForm from '@/components/presence/pc-presence-edit-form/page'
import DetailGoEarlyForm from '@/components/presence/pc-presence-detail-form/page'
import DeleteGoEarlyForm from '@/components/presence/pc-presence-delete-form/page'
import EditNotAbsentForm from '@/components/presence/tp-presence-edit-form/page'
import DetailNotAbsentForm from '@/components/presence/tp-presence-detail-form/page'
import DeleteNotAbsentPresenceModal from '@/components/presence/tp-presence-delete-form/page'
import EditAlphaForm from '@/components/presence/a-presence-edit-form/page'
import DetailAlphaForm from '@/components/presence/a-presence-detail-form/page'
import DeleteAlphaForm from '@/components/presence/a-presence-delete-form/page'
import EditSickForm from '@/components/presence/s-presence-delete-form/page'
import DetailSickForm from '@/components/presence/s-presence-detail-form/page'
import DeleteSickForm from '@/components/presence/s-presence-delete-form/page'
import EditPermissionForm from '@/components/presence/i-presence-edit-form/page'
import DetailPermissionForm from '@/components/presence/i-presence-detail-form/page'
import DeletePermissionForm from '@/components/presence/i-presence-detail-form/page'
import DetailLeaveForm from '@/components/presence/c-presence-detail-form/page'
import DeleteLeaveForm from '@/components/presence/c-presence-delete-form/page'
import EditHolidayForm from '@/components/presence/l-presence-detail-form/page'
import DetailHolidayForm from '@/components/presence/l-presence-detail-form/page'
import DeleteHolidayForm from '@/components/presence/l-presence-delete-form/page'
import EditLeaveTypeForm from '@/components/presence/c-presence-edit-form/page'
import EditPresenceRecordForm from '@/components/presence/presence-records-edit-form/page'
import DownloadPresenceModal from '@/components/presence/download-modal/page'
import DownloadPresenceRecordsModal from '@/components/presence/download-presence-records-modal/page'
import AddPresenceRecordForm from '@/components/presence/add-manual-absent-form/page'
import ExportToExcelAssets from '@/components/assets/assets-template/page'

export default function Kehadiran() {
    const [isClient, setIsClient] = useState(false)
    const [showDownloadPresenceModal, setShowDownloadPresenceModal] =
        useState(false)
    const [
        showDownloadPresenceRecordsModal,
        setShowDownloadPresenceRecordsModal,
    ] = useState(false)
    const [showAddPresenceModal, setShowAddPresenceModal] = useState(false)
    const [showDetailPresentModal, setShowDetailPresentModal] = useState(false)
    const [showEditPresentModal, setShowEditPresentModal] = useState(false)
    const [showDeletePresentModal, setShowDeletePresentModal] = useState(false)
    const [showDetailArriveLateModal, setShowDetailArriveLateModal] =
        useState(false)
    const [showEditArriveLateModal, setShowEditArriveLateModal] =
        useState(false)
    const [showDeleteArriveLateModal, setShowDeleteArriveLateModal] =
        useState(false)
    const [showDetailGoEarlyModal, setShowDetailGoEarlyModal] = useState(false)
    const [showEditGoEarlyModal, setShowEditGoEarlyModal] = useState(false)
    const [showDeleteGoEarlyModal, setShowDeleteGoEarlyModal] = useState(false)
    const [showDetailNotAbsentModal, setShowDetailNotAbsentModal] =
        useState(false)
    const [showEditNotAbsentModal, setShowEditNotAbsentModal] = useState(false)
    const [showDeleteNotAbsentModal, setShowDeleteNotAbsentModal] =
        useState(false)
    const [showDetailAlphaModal, setShowDetailAlphaModal] = useState(false)
    const [showEditAlphaModal, setShowEditAlphaModal] = useState(false)
    const [showDeleteAlphaModal, setShowDeleteAlphaModal] = useState(false)
    const [showDetailSickModal, setShowDetailSickModal] = useState(false)
    const [showEditSickModal, setShowEditSickModal] = useState(false)
    const [showDeleteSickModal, setShowDeleteSickModal] = useState(false)
    const [showDetailPermissionModal, setShowDetailPermissionModal] =
        useState(false)
    const [showEditPermissionModal, setShowEditPermissionModal] =
        useState(false)
    const [showDeletePermissionModal, setShowDeletePermissionModal] =
        useState(false)
    const [showDetailLeaveModal, setShowDetailLeaveModal] = useState(false)
    const [showEditLeaveModal, setShowEditLeaveModal] = useState(false)
    const [showDeleteLeaveModal, setShowDeleteLeaveModal] = useState(false)

    const [showDetailHolidayModal, setShowDetailHolidayModal] = useState(false)
    const [showEditHolidayModal, setShowEditHolidayModal] = useState(false)
    const [showDeleteHolidayModal, setShowDeleteHolidayModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState('Kehadiran')
    const [presentPage, setPresentPage] = useState(1)
    const [presentLimit, setPresentLimit] = useState(5)
    const [presentSearchData, setPresentSearchData] = useState('')
    const [arriveLatePage, setArriveLatePage] = useState(1)
    const [arriveLateLimit, setArriveLateLimit] = useState(5)
    const [arriveLateSearchData, setArriveLateSearchData] = useState('')
    const [goEarlyPage, setGoEarlyPage] = useState(1)
    const [goEarlyLimit, setGoEarlyLimit] = useState(5)
    const [goEarlySearchData, setGoEarlySearchData] = useState('')
    const [notAbsentFromHomePage, setNotAbsentFromHomePage] = useState(1)
    const [notAbsentFromHomeLimit, setNotAbsentFromHomeLimit] = useState(5)
    const [notAbsentFromHomeSearchData, setNotAbsentFromHomeSearchData] =
        useState('')
    const [alphaPage, setAlphaPage] = useState(1)
    const [alphaLimit, setAlphaLimit] = useState(5)
    const [alphaSearchData, setAlphaSearchData] = useState('')
    const [sickPage, setSickPage] = useState(1)
    const [sickLimit, setSickLimit] = useState(5)
    const [sickSearchData, setSickSearchData] = useState('')
    const [permissionPage, setPermissionPage] = useState(1)
    const [permissionLimit, setPermissionLimit] = useState(5)
    const [permissionSearchData, setPermissionSearchData] = useState('')
    const [leavePage, setLeavePage] = useState(1)
    const [leaveLimit, setLeaveLimit] = useState(5)
    const [leaveSearchData, setLeaveSearchData] = useState('')
    const [holidayPage, setHolidayPage] = useState(1)
    const [holidayLimit, setHolidayLimit] = useState(5)
    const [holidaySearchData, setHolidaySearchData] = useState('')
    const [employeePage, setEmployeePage] = useState(1)
    const [employeeLimit, setEmployeeLimit] = useState(5)
    const [employeeSearchData, setEmployeeSearchData] = useState('')
    const [showEditPresenceModal, setShowEditPresenceModal] = useState(false)
    const selectedPresenceButton = useSelector(
        (state) => state.presence.presence.selectedPresenceButton
    )
    const selectedPresenceData = useSelector(
        (state) => state.presence.presence.selectedPresenceData
    )
    const selectedPresenceRecordsData = useSelector(
        (state) => state.presence.presence_records.presence_records_data
    )
    const token = getCookie('token')

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handlePageChange = (page) => {
        if (selectedPresenceButton === 'H') {
            setPresentPage(page)
        } else if (selectedPresenceButton === 'HT') {
            setArriveLatePage(page)
        } else if (selectedPresenceButton === 'PC') {
            setGoEarlyPage(page)
        } else if (selectedPresenceButton === 'TP') {
            setNotAbsentFromHomePage(page)
        } else if (selectedPresenceButton === 'A') {
            setAlphaPage(page)
        } else if (selectedPresenceButton === 'S') {
            setSickPage(page)
        } else if (selectedPresenceButton === 'I') {
            setPermissionPage(page)
        } else if (selectedPresenceButton === 'C') {
            setLeavePage(page)
        } else if (selectedPresenceButton === 'L') {
            setHolidayPage(page)
        } else if (selectedItem === 'Rekap Kehadiran') {
            setEmployeePage(page)
        }
    }

    const buttons = [
        {
            title: 'Kehadiran',
            icon: 'heroicons-outline:home',
        },
        {
            title: 'Rekap Kehadiran',
            icon: 'heroicons-outline:user',
        },
    ]

    async function fetchPresence() {
        try {
            const { data } = await http(token).get('/presence?limit=999999')
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: presenceData } = useQuery({
        queryKey: ['presence'],
        queryFn: () => fetchPresence(),
    })

    async function fetchEmployee() {
        try {
            const { data } = await http(token).get(
                `/employee/active?page=${employeePage}&limit=${employeeLimit}&search=${employeeSearchData}`
            )
            return data.results
        } catch (err) {
            console.log(err)
        }
    }

    const { data: employeeData } = useQuery({
        queryKey: [
            'active-employee',
            employeePage,
            employeeLimit,
            employeeSearchData,
        ],
        queryFn: () => fetchEmployee(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchPresent() {
        const { data } = await http(token).get(
            `/presence/present?page=${presentPage}&limit=${presentLimit}&search=${presentSearchData}`
        )
        return data.results
    }

    const { data: presentData } = useQuery({
        queryKey: ['present', presentPage, presentLimit, presentSearchData],
        queryFn: () => fetchPresent(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchArrivingLate() {
        const { data } = await http(token).get(
            `/presence/arrive-late?page=${arriveLatePage}&limit=${arriveLateLimit}&search=${arriveLateSearchData}`
        )
        return data.results
    }

    const { data: arrivingLateData } = useQuery({
        queryKey: [
            'arriving-late',
            arriveLatePage,
            arriveLateLimit,
            arriveLateSearchData,
        ],
        queryFn: () => fetchArrivingLate(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchGoEarly() {
        const { data } = await http(token).get(
            `/presence/go-early?page=${goEarlyPage}&limit=${goEarlyLimit}&search=${goEarlySearchData}`
        )
        return data.results
    }

    const { data: goEarlyData } = useQuery({
        queryKey: ['go-early', goEarlyPage, goEarlyLimit, goEarlySearchData],
        queryFn: () => fetchGoEarly(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchNotAbsentFromHome() {
        const { data } = await http(token).get(
            `/presence/not-absent?page=${notAbsentFromHomePage}&limit=${notAbsentFromHomeLimit}&search=${notAbsentFromHomeSearchData}`
        )
        return data.results
    }

    const { data: notAbsentFromHomeData } = useQuery({
        queryKey: [
            'not-absent-from-home',
            notAbsentFromHomePage,
            notAbsentFromHomeLimit,
            notAbsentFromHomeSearchData,
        ],
        queryFn: () => fetchNotAbsentFromHome(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchAlpha() {
        const { data } = await http(token).get(
            `/presence/alpha?page=${alphaPage}&limit=${alphaLimit}&search=${alphaSearchData}`
        )
        return data.results
    }

    const { data: alphaData } = useQuery({
        queryKey: ['alpha', alphaPage, alphaLimit, alphaSearchData],
        queryFn: () => fetchAlpha(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchSick() {
        const { data } = await http(token).get(
            `/presence/sick?page=${sickPage}&limit=${sickLimit}&search=${sickSearchData}`
        )
        return data.results
    }

    const { data: sickData } = useQuery({
        queryKey: ['sick', sickPage, sickLimit, sickSearchData],
        queryFn: () => fetchSick(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchPermission() {
        const { data } = await http(token).get(
            `/presence/permission?page=${permissionPage}&limit=${permissionLimit}&search=${permissionSearchData}`
        )
        return data.results
    }

    const { data: permissionData } = useQuery({
        queryKey: [
            'permission',
            permissionPage,
            permissionLimit,
            permissionSearchData,
        ],
        queryFn: () => fetchPermission(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchLeaveType() {
        const { data } = await http(token).get(
            `/presence/leave-type?page=${leavePage}&limit=${leaveLimit}&search=${leaveSearchData}`
        )
        return data.results
    }

    const { data: leaveData } = useQuery({
        queryKey: ['leave', leavePage, leaveLimit, leaveSearchData],
        queryFn: () => fetchLeaveType(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    async function fetchHoliday() {
        const { data } = await http(token).get(
            `/presence/holiday?page=${holidayPage}&limit=${holidayLimit}&search=${holidaySearchData}`
        )
        return data.results
    }

    const { data: holidayData } = useQuery({
        queryKey: ['holiday', holidayPage, holidayLimit, holidaySearchData],
        queryFn: () => fetchHoliday(),
        staleTime: 10 * 60 * 1000,
        cacheTime: 60 * 60 * 1000,
    })

    return (
        <>
            <div>
                <div className="w-full flex flex-wrap justify-between mb-5">
                    <div className="flex flex-wrap gap-5 justify-center items-center">
                        <h5>
                            {selectedItem === 'Kehadiran'
                                ? 'Data Kehadiran'
                                : 'Data Rekap Kehadiran'}
                        </h5>
                    </div>
                    <div className="mt-8 xl:mt-0 flex gap-5">
                        <div>
                            <Button
                                icon="heroicons-outline:plus"
                                text="Buat Kehadiran"
                                className="btn-success"
                                onClick={() => {
                                    setShowAddPresenceModal(
                                        !showAddPresenceModal
                                    )
                                }}
                            />
                        </div>
                        {selectedItem === 'Kehadiran' && (
                            <div className="flex gap-5">
                                <Button
                                    text="Download"
                                    icon="heroicons-outline:newspaper"
                                    className="bg-warning-500 text-white"
                                    onClick={() => {
                                        selectedPresenceData?.length == 0
                                            ? toast.error(
                                                  'Silahkan ceklis data terlebih dahulu'
                                              )
                                            : setShowDownloadPresenceModal(
                                                  !showDownloadPresenceModal
                                              )
                                    }}
                                />
                            </div>
                        )}
                        {selectedItem === 'Rekap Kehadiran' && (
                            <div className="flex gap-5">
                                <Button
                                    text="Download"
                                    icon="heroicons-outline:newspaper"
                                    className="bg-warning-500 text-white"
                                    onClick={() => {
                                        selectedPresenceRecordsData?.length == 0
                                            ? toast.error(
                                                  'Silahkan ceklis data terlebih dahulu'
                                              )
                                            : setShowDownloadPresenceRecordsModal(
                                                  !showDownloadPresenceRecordsModal
                                              )
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex gap-5">
                            <div>
                                <Button
                                    icon="heroicons-outline:newspaper"
                                    text="Import"
                                    className="btn-primary"
                                />
                            </div>
                            <div>
                                <ExportToExcelAssets />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <Card
                        title={true}
                        period={
                            <div className="flex gap-2">
                                <div className="flex justify-center items-center gap-3">
                                    <div>
                                        <Flatpickr
                                            defaultValue={new Date()}
                                            id="period"
                                            placeholder="Periode Awal - Periode Akhir"
                                            className="date-picker-control w-[210px] py-2 h-[48px]"
                                            options={{
                                                mode: 'range',
                                                defaultDate: new Date(),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        search={
                            <div>
                                <InputGroup
                                    id="largesize"
                                    type="text"
                                    placeholder="Cari"
                                    className="h-[48px]"
                                    onChange={(e) => {
                                        if (selectedPresenceButton === 'H') {
                                            setPresentSearchData(e.target.value)
                                        } else if (
                                            selectedPresenceButton === 'HT'
                                        ) {
                                            setArriveLateSearchData(
                                                e.target.value
                                            )
                                        } else if (
                                            selectedPresenceButton === 'PC'
                                        ) {
                                            setGoEarlySearchData(e.target.value)
                                        } else if (
                                            selectedPresenceButton === 'TP'
                                        ) {
                                            setNotAbsentFromHomeSearchData(
                                                e.target.value
                                            )
                                        } else if (
                                            selectedPresenceButton === 'A'
                                        ) {
                                            setAlphaSearchData(e.target.value)
                                        } else if (
                                            selectedPresenceButton === 'S'
                                        ) {
                                            setSickSearchData(e.target.value)
                                        } else if (
                                            selectedPresenceButton === 'I'
                                        ) {
                                            setPermissionSearchData(
                                                e.target.value
                                            )
                                        } else if (
                                            selectedPresenceButton === 'C'
                                        ) {
                                            setLeaveSearchData(e.target.value)
                                        } else if (
                                            selectedPresenceButton === 'H'
                                        ) {
                                            setHolidaySearchData(e.target.value)
                                        } else if (
                                            selectedItem === 'Rekap Kehadiran'
                                        ) {
                                            setEmployeeSearchData(
                                                e.target.value
                                            )
                                        }
                                    }}
                                    append={
                                        <Icon icon="heroicons-outline:search" />
                                    }
                                />
                            </div>
                        }
                    >
                        <Tab.Group>
                            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                                {buttons.map((item, i) => (
                                    <Tab as={Fragment} key={i}>
                                        {({ selected }) => (
                                            <button
                                                onClick={() => {
                                                    setSelectedItem(item.title)
                                                }}
                                                className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150
              
                                                ${
                                                    selected
                                                        ? 'text-white bg-primary-500 '
                                                        : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300'
                                                }`}
                                            >
                                                {item.title}
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="text-slate-6000 dark:text-slate-4000 text-sm font-normal">
                                        <DataKehadiran
                                            presentData={presentData}
                                            arrivingLateData={arrivingLateData}
                                            goEarlyData={goEarlyData}
                                            notAbsentFromHomeData={
                                                notAbsentFromHomeData
                                            }
                                            alphaData={alphaData}
                                            sickData={sickData}
                                            permissionData={permissionData}
                                            leaveData={leaveData}
                                            holidayData={holidayData}
                                            setShowViewNotAbsentModal={
                                                setShowDetailNotAbsentModal
                                            }
                                            setShowEditNotAbsentModal={
                                                setShowEditNotAbsentModal
                                            }
                                            setShowDeleteNotAbsentModal={
                                                setShowDeleteNotAbsentModal
                                            }
                                            setShowViewGoEarlyModal={
                                                setShowDetailGoEarlyModal
                                            }
                                            setShowEditGoEarlyModal={
                                                setShowEditGoEarlyModal
                                            }
                                            setShowDeleteGoEarlyModal={
                                                setShowDeleteGoEarlyModal
                                            }
                                            setShowViewPresentModal={
                                                setShowDetailPresentModal
                                            }
                                            setShowEditPresentModal={
                                                setShowEditPresentModal
                                            }
                                            setShowDeletePresentModal={
                                                setShowDeletePresentModal
                                            }
                                            setShowViewArriveLateModal={
                                                setShowDetailArriveLateModal
                                            }
                                            setShowEditArriveLateModal={
                                                setShowEditArriveLateModal
                                            }
                                            setShowDeleteArriveLateModal={
                                                setShowDeleteArriveLateModal
                                            }
                                            setShowViewAlphaModal={
                                                setShowDetailAlphaModal
                                            }
                                            setShowEditAlphaModal={
                                                setShowEditAlphaModal
                                            }
                                            setShowDeleteAlphaModal={
                                                setShowDeleteAlphaModal
                                            }
                                            setShowViewSickModal={
                                                setShowDetailSickModal
                                            }
                                            setShowEditSickModal={
                                                setShowEditSickModal
                                            }
                                            setShowDeleteSickModal={
                                                setShowDeleteSickModal
                                            }
                                            setShowViewPermissionModal={
                                                setShowDetailPermissionModal
                                            }
                                            setShowEditPermissionModal={
                                                setShowEditPermissionModal
                                            }
                                            setShowDeletePermissionModal={
                                                setShowDeletePermissionModal
                                            }
                                            setShowViewLeaveModal={
                                                setShowDetailLeaveModal
                                            }
                                            setShowEditLeaveModal={
                                                setShowEditLeaveModal
                                            }
                                            setShowDeleteLeaveModal={
                                                setShowDeleteLeaveModal
                                            }
                                            setShowViewHolidayModal={
                                                setShowDetailHolidayModal
                                            }
                                            setShowEditHolidayModal={
                                                setShowEditHolidayModal
                                            }
                                            setShowDeleteHolidayModal={
                                                setShowDeleteHolidayModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                                        <RekapKehadiran
                                            presenceData={presenceData}
                                            employeeData={employeeData}
                                            setShowEditPresenceModal={
                                                setShowEditPresenceModal
                                            }
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Card>
                </div>
                <div className="w-full flex flex-wrap justify-between mt-8">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            onChange={(e) => {
                                if (selectedPresenceButton === 'H') {
                                    setPresentLimit(e.target.value)
                                } else if (selectedPresenceButton === 'HT') {
                                    setArriveLateLimit(e.target.value)
                                } else if (selectedPresenceButton === 'PC') {
                                    setGoEarlyLimit(e.target.value)
                                } else if (selectedPresenceButton === 'TP') {
                                    setNotAbsentFromHomeLimit(e.target.value)
                                } else if (selectedPresenceButton === 'A') {
                                    setAlphaLimit(e.target.value)
                                } else if (selectedPresenceButton === 'S') {
                                    setSickLimit(e.target.value)
                                } else if (selectedPresenceButton === 'I') {
                                    setPermissionLimit(e.target.value)
                                } else if (selectedPresenceButton === 'C') {
                                    setLeaveLimit(e.target.value)
                                } else if (selectedPresenceButton === 'L') {
                                    setHolidayLimit(e.target.value)
                                } else if (selectedItem === 'Rekap Kehadiran') {
                                    setEmployeeLimit(e.target.value)
                                }
                            }}
                            className="form-control py-2 w-max"
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {selectedPresenceButton === 'H' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {presentData?.currentPage} of{' '}
                                    {presentData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'PC' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {goEarlyData?.currentPage} of{' '}
                                    {goEarlyData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'HT' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {arrivingLateData?.currentPage} of{' '}
                                    {arrivingLateData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'TP' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {notAbsentFromHomeData?.currentPage} of{' '}
                                    {notAbsentFromHomeData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'A' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {alphaData?.currentPage} of{' '}
                                    {alphaData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'S' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {sickData?.currentPage} of{' '}
                                    {sickData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'I' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {permissionData?.currentPage} of{' '}
                                    {permissionData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'C' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {leaveData?.currentPage} of{' '}
                                    {leaveData?.totalPages}
                                </span>
                            </span>
                        ) : selectedPresenceButton === 'L' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {holidayData?.currentPage} of{' '}
                                    {holidayData?.totalPages}
                                </span>
                            </span>
                        ) : selectedItem === 'Rekap Kehadiran' ? (
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Page{' '}
                                <span>
                                    {employeeData?.currentPage} of{' '}
                                    {employeeData?.totalPages}
                                </span>
                            </span>
                        ) : null}
                    </div>
                    <div className="mt-8 xl:mt-0">
                        <Pagination
                            className="bg-slate-100 dark:bg-slate-500  w-fit py-2 px-3 rounded mx-auto"
                            totalPages={
                                selectedPresenceButton === 'H'
                                    ? presentData?.totalPages
                                    : selectedPresenceButton === 'HT'
                                      ? arrivingLateData?.totalPages
                                      : selectedPresenceButton === 'PC'
                                        ? goEarlyData?.totalPages
                                        : selectedPresenceButton === 'TP'
                                          ? notAbsentFromHomeData?.totalPages
                                          : selectedPresenceButton === 'A'
                                            ? alphaData?.totalPages
                                            : selectedPresenceButton === 'S'
                                              ? sickData?.totalPages
                                              : selectedPresenceButton === 'I'
                                                ? permissionData?.totalPages
                                                : selectedPresenceButton === 'C'
                                                  ? leaveData?.totalPages
                                                  : selectedPresenceButton ===
                                                      'L'
                                                    ? holidayData?.totalPages
                                                    : selectedItem ===
                                                        'Rekap Kehadiran'
                                                      ? employeeData?.totalPages
                                                      : 0
                            }
                            currentPage={
                                selectedPresenceButton === 'H'
                                    ? presentData?.currentPage
                                    : selectedPresenceButton === 'HT'
                                      ? arrivingLateData?.currentPage
                                      : selectedPresenceButton === 'PC'
                                        ? goEarlyData?.currentPage
                                        : selectedPresenceButton === 'TP'
                                          ? notAbsentFromHomeData?.currentPage
                                          : selectedPresenceButton === 'A'
                                            ? alphaData?.currentPage
                                            : selectedPresenceButton === 'S'
                                              ? sickData?.currentPage
                                              : selectedPresenceButton === 'I'
                                                ? permissionData?.currentPage
                                                : selectedPresenceButton === 'C'
                                                  ? leaveData?.currentPage
                                                  : selectedPresenceButton ===
                                                      'L'
                                                    ? holidayData?.currentPage
                                                    : selectedItem ===
                                                        'Rekap Kehadiran'
                                                      ? employeeData?.currentPage
                                                      : 0
                            }
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditPresentModal}
                onClose={() => {
                    setShowEditPresentModal(!showEditPresentModal)
                }}
            >
                <EditPresentForm
                    setShowEditPresentModal={setShowEditPresentModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailPresentModal}
                onClose={() => {
                    setShowDetailPresentModal(!showDetailPresentModal)
                }}
            >
                <DetailPresentForm
                    setShowDetailPresentModal={setShowDetailPresentModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeletePresentModal}
                onClose={() => {
                    setShowDeletePresentModal(!showDeletePresentModal)
                }}
            >
                <DeletePresentForm
                    setShowDeletePresentModal={setShowDeletePresentModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditArriveLateModal}
                onClose={() => {
                    setShowEditArriveLateModal(!showEditArriveLateModal)
                }}
            >
                <EditArriveLateForm
                    setShowEditArriveLateModal={setShowEditArriveLateModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailArriveLateModal}
                onClose={() => {
                    setShowDetailArriveLateModal(!showDetailArriveLateModal)
                }}
            >
                <DetailArriveLateForm
                    setShowDetailArriveLateModal={setShowDetailArriveLateModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteArriveLateModal}
                onClose={() => {
                    setShowDeleteArriveLateModal(!showDeleteArriveLateModal)
                }}
            >
                <DeleteArriveLateForm
                    setShowDeleteArriveLateModal={setShowDeleteArriveLateModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditGoEarlyModal}
                onClose={() => {
                    setShowEditGoEarlyModal(!showEditGoEarlyModal)
                }}
            >
                <EditGoEarlyForm
                    setShowEditGoEarlyModal={setShowEditGoEarlyModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailGoEarlyModal}
                onClose={() => {
                    setShowDetailGoEarlyModal(!showDetailGoEarlyModal)
                }}
            >
                <DetailGoEarlyForm
                    setShowDetailGoEarlyModal={setShowDetailGoEarlyModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteGoEarlyModal}
                onClose={() => {
                    setShowDeleteGoEarlyModal(!showDeleteGoEarlyModal)
                }}
            >
                <DeleteGoEarlyForm
                    setShowDeleteGoEarlyModal={setShowDeleteGoEarlyModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditNotAbsentModal}
                onClose={() => {
                    setShowEditNotAbsentModal(!showEditNotAbsentModal)
                }}
            >
                <EditNotAbsentForm
                    setShowEditNotAbsentModal={setShowEditNotAbsentModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailNotAbsentModal}
                onClose={() => {
                    setShowDetailNotAbsentModal(!showDetailNotAbsentModal)
                }}
            >
                <DetailNotAbsentForm
                    setShowDetailNotAbsentModal={setShowDetailNotAbsentModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteNotAbsentModal}
                onClose={() => {
                    setShowDeleteNotAbsentModal(!showDeleteNotAbsentModal)
                }}
            >
                <DeleteNotAbsentPresenceModal
                    setShowDeleteNotAbsentModal={setShowDeleteNotAbsentModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditAlphaModal}
                onClose={() => {
                    setShowEditAlphaModal(!showEditAlphaModal)
                }}
            >
                <EditAlphaForm setShowEditAlphaModal={setShowEditAlphaModal} />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailAlphaModal}
                onClose={() => {
                    setShowDetailAlphaModal(!showDetailAlphaModal)
                }}
            >
                <DetailAlphaForm
                    setShowDetailAlphaModal={setShowDetailAlphaModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteAlphaModal}
                onClose={() => {
                    setShowDeleteAlphaModal(!showDeleteAlphaModal)
                }}
            >
                <DeleteAlphaForm
                    setShowDeleteAlphaModal={setShowDeleteAlphaModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditSickModal}
                onClose={() => {
                    setShowEditSickModal(!showEditSickModal)
                }}
            >
                <EditSickForm setShowEditSickModal={setShowEditSickModal} />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailSickModal}
                onClose={() => {
                    setShowDetailSickModal(!showDetailSickModal)
                }}
            >
                <DetailSickForm
                    setShowDetailSickModal={setShowDetailSickModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteSickModal}
                onClose={() => {
                    setShowDeleteSickModal(!showDeleteSickModal)
                }}
            >
                <DeleteSickForm
                    setShowDeleteSickModal={setShowDeleteSickModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditPermissionModal}
                onClose={() => {
                    setShowEditPermissionModal(!showEditPermissionModal)
                }}
            >
                <EditPermissionForm
                    setShowEditPermissionModal={setShowEditPermissionModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailPermissionModal}
                onClose={() => {
                    setShowDetailPermissionModal(!showDetailPermissionModal)
                }}
            >
                <DetailPermissionForm
                    setShowDetailPermissionModal={setShowDetailPermissionModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeletePermissionModal}
                onClose={() => {
                    setShowDeletePermissionModal(!showDeletePermissionModal)
                }}
            >
                <DeletePermissionForm
                    setShowDeletePermissionModal={setShowDeletePermissionModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditLeaveModal}
                onClose={() => {
                    setShowEditLeaveModal(!showEditLeaveModal)
                }}
            >
                <EditLeaveTypeForm
                    setShowEditLeaveModal={setShowEditLeaveModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailLeaveModal}
                onClose={() => {
                    setShowDetailLeaveModal(!showDetailLeaveModal)
                }}
            >
                <DetailLeaveForm
                    setShowDetailLeaveModal={setShowDetailLeaveModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteLeaveModal}
                onClose={() => {
                    setShowDeleteLeaveModal(!showDeleteLeaveModal)
                }}
            >
                <DeleteLeaveForm
                    setShowDeleteLeaveModal={setShowDeleteLeaveModal}
                />
            </Modal>
            <Modal
                title="Edit Kehadiran"
                label="Edit Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditHolidayModal}
                onClose={() => {
                    setShowEditHolidayModal(!showEditHolidayModal)
                }}
            >
                <EditHolidayForm
                    setShowEditHolidayModal={setShowEditHolidayModal}
                />
            </Modal>
            <Modal
                title="Detail Kehadiran"
                label="Detail Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showDetailHolidayModal}
                onClose={() => {
                    setShowDetailHolidayModal(!showDetailHolidayModal)
                }}
            >
                <DetailHolidayForm
                    setShowDetailHolidayModal={setShowDetailHolidayModal}
                />
            </Modal>
            <Modal
                title="Hapus Kehadiran"
                label="Hapus Kehadiran"
                labelClass="btn-outline-dark"
                activeModal={showDeleteHolidayModal}
                onClose={() => {
                    setShowDeleteHolidayModal(!showDeleteHolidayModal)
                }}
            >
                <DeleteHolidayForm
                    setShowDeleteHolidayModal={setShowDeleteHolidayModal}
                />
            </Modal>
            <Modal
                title="Download"
                label="Download"
                labelClass="btn-outline-dark"
                className="max-w-sm"
                activeModal={showDownloadPresenceModal}
                onClose={() => {
                    setShowDownloadPresenceModal(!showDownloadPresenceModal)
                }}
            >
                <DownloadPresenceModal
                    setShowDownloadPresenceForm={setShowDownloadPresenceModal}
                    selectedPresenceData={selectedPresenceData}
                    isClient={isClient}
                />
            </Modal>
            <Modal
                title="Download"
                label="Download"
                labelClass="btn-outline-dark"
                className="max-w-sm"
                activeModal={showDownloadPresenceRecordsModal}
                onClose={() => {
                    setShowDownloadPresenceRecordsModal(
                        !showDownloadPresenceRecordsModal
                    )
                }}
            >
                <DownloadPresenceRecordsModal
                    setShowDownloadPresenceRecordsModal={
                        setShowDownloadPresenceRecordsModal
                    }
                    selectedPresenceRecordsData={selectedPresenceRecordsData}
                    isClient={isClient}
                />
            </Modal>
            <Modal
                title="Edit Rekap Kehadiran"
                label="Edit Rekap Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showEditPresenceModal}
                onClose={() => {
                    setShowEditPresenceModal(!showEditPresenceModal)
                }}
            >
                <EditPresenceRecordForm
                    setShowEditPresenceModal={setShowEditPresenceModal}
                />
            </Modal>
            <Modal
                title="Buat Kehadiran"
                label="Buat Kehadiran"
                className="max-w-3xl"
                labelClass="btn-outline-dark"
                activeModal={showAddPresenceModal}
                onClose={() => {
                    setShowAddPresenceModal(!showAddPresenceModal)
                }}
            >
                <AddPresenceRecordForm
                    setShowAddPresenceModal={setShowAddPresenceModal}
                />
            </Modal>
        </>
    )
}
